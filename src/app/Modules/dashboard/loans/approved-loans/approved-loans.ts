import { Component, OnInit, signal } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Data } from '../../../../core/Servies/data';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-approved-loans',
  standalone: false,
  templateUrl: './approved-loans.html',
  styleUrl: './approved-loans.scss',
})
export class ApprovedLoans implements OnInit {
  // ==========================Implemantion===============================//
  ngOnInit(): void {
    this.GetDataLoans();
    this.CreateForm();
  }

  constructor(
    private ref: DynamicDialogRef,
    private Data: Data,
    private FB: FormBuilder,
    private config: DynamicDialogConfig,
  ) {}

  //=========================Varibels===============================//
  Form = signal<FormGroup>(new FormGroup({}));
  data_loan = signal<any>({});

  // =========================Functions=============================== //
  GetDataLoans() {
    this.data_loan.set(this.config.data?.item);
  }

  CreateForm() {
    this.Form.set(
      this.FB.group({
        status: ['Approved'],
        durationInMonths: ['', Validators.required],
        interestRate: ['', Validators.required],
        installments: this.FB.array([
          this.FB.group({
            id: [0],
            name: ['', Validators.required],
            amount: ['', Validators.required],
            status: false,
            paymentDate: ['', Validators.required],
          }),
        ]),
      }),
    );
  }

  get installmentsArray() {
    return this.Form().get('installments') as FormArray;
  }

  AddInstallments() {
    this.installmentsArray.push(
      this.FB.group({
        id: [0],
        name: [''],
        amount: [''],
        status: false,
        paymentDate: [''],
      }),
    );
  }

  removeInstallments(index: number) {
    if (this.installmentsArray.length > 0) {
      this.installmentsArray.removeAt(index);
    }
  }

  onSubmit() {
    if (this.Form().invalid) {
      this.Form().markAllAsTouched();
      return;
    }

    this.Data.put(`Loans/${this.data_loan()?.id}/approve`, this.Form().value).subscribe((res) => {
      this.onCloseDilog();
    });
  }

  onCloseDilog() {
    this.ref.close('success');
    this.Form().reset();
  }

  getControlName(controlName: string) {
    return this.Form().get(controlName);
  }
}
