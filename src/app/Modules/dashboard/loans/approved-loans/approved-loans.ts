import { Component, OnInit, signal } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Data } from '../../../../core/Servies/data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      }),
    );
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
