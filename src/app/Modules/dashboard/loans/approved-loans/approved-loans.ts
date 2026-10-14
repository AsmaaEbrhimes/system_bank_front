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

  TotalBalanceInAmount(): number {
    return (
      this.installmentsArray.controls.reduce(
        (acc: number, item: any) => acc + (Number(item.get('amount')?.value) || 0),
        0,
      ) || 0
    );
  }

isApproveDisabled(): boolean {
  const duration = Number(this.Form().get('durationInMonths')?.value) || 0;
  const interestRate = Number(this.Form().get('interestRate')?.value) || 0;
  const amount = Number(this.data_loan()?.amount) || 0;
  const totalBalance = Number(this.TotalBalanceInAmount()) || 0;

  // التقريب لخانتين عشريتين
  const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

  // الشرط 1: عدد الأقساط لازم يساوي مدة القرض
  const installmentsMismatch = this.installmentsArray.length !== duration;

  // الشرط 2: المبلغ + الفايدة لازم يساوي إجمالي الأقساط
  const totalWithInterest = amount + ((amount * interestRate) / 100) * (duration / 12);
  const totalMismatch = round2(totalWithInterest) !== round2(totalBalance);

  return installmentsMismatch || totalMismatch;
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

  getInstallmentControl(index: number, controlName: string) {
    const accountGroup = this.installmentsArray.at(index) as FormGroup;
    return accountGroup?.get(controlName);
  }
}
