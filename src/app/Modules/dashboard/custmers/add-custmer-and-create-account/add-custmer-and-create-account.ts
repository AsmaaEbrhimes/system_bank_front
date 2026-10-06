import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Validators } from '@angular/forms';
import { Data } from '../../../../core/Servies/data';

@Component({
  selector: 'app-add-custmer-and-create-account',
  standalone: false,
  templateUrl: './add-custmer-and-create-account.html',
  styleUrl: './add-custmer-and-create-account.scss',
})
export class AddCustmerAndCreateAccount implements OnInit {
  //=========================Varibels===============================//
  accountType = [
    { value: 'INDIVIDUAL' },
    { value: 'CORPORATE' },
    { value: 'JOINT' },
    { value: 'MINOR' },
    { value: 'MERCHANT' },
  ];

  accountStatus: any[] = [
    { code: 'ACTIVE' },
    { code: 'INACTIVE' },
    { code: 'FROZEN' },
    { code: 'SUSPENDED' },
    { code: 'CLOSED' },
    { code: 'PENDING_APPROVAL' },
  ];

  Form = signal<FormGroup>(new FormGroup({}));
  data_custmer = signal<any>({});

  // ==========================Implemantion===============================//
  private config = inject(DynamicDialogConfig);
  public ref = inject(DynamicDialogRef);
  incomingData = this.config.data;

  constructor(
    private FB: FormBuilder,
    private Data: Data,
  ) {
    this.data_custmer.set(this.incomingData);
  }

  ngOnInit(): void {
    this.createAccount();
  }

  // =========================Functions=============================== //
  createAccount() {
    const currentIsoDate = new Date().toISOString();
    this.Form.set(
      this.FB.group({
        id: [0],
        fullName: ['', Validators.required],
        nationalId: ['', Validators.required],
        email: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        createdAt: [currentIsoDate],
        accounts: this.FB.array([
          this.FB.group({
            id: 0,
            accountNumber: ['', Validators.required],
            accountType: ['', Validators.required],
            balance: ['', Validators.required],
            status: ['', Validators.required],
            createdAt: [currentIsoDate],
            customerId: ['', Validators.required],
          }),
        ]),
      }),
    );
  }

  get accountsArray(): FormArray {
    return this.Form().get('accounts') as FormArray;
  }

  addAccount() {
    this.accountsArray.push(
      this.FB.group({
        id: [0],
        accountNumber: ['', Validators.required],
        accountType: ['', Validators.required],
        balance: [0, [Validators.required, Validators.min(0)]],
        status: ['', Validators.required],
        createdAt: [new Date().toISOString()],
        customerId: [0],
      }),
    );
  }

  removeAccount(index: number) {
    if (this.accountsArray.length > 1) {
      this.accountsArray.removeAt(index);
    }
  }

  onSubmit() {
    if (this.Form().invalid) {
      this.Form().markAllAsTouched();
      return;
    }
    this.Data.post('Customers', this.Form().value).subscribe((res: any) => {
      this.ref.close('success');
      this.Form().reset();
    });
  }

  getControlName(controlName: string) {
    return this.Form().get(controlName);
  }
  getAccountControl(index: number, controlName: string) {
    const accountGroup = this.accountsArray.at(index) as FormGroup;
    return accountGroup?.get(controlName);
  }
}
