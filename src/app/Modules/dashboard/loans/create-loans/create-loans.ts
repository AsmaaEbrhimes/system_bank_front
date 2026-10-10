import { panel } from './../../panel.service';
import { Component, OnInit, signal } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Data } from '../../../../core/Servies/data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-loans',
  standalone: false,
  templateUrl: './create-loans.html',
  styleUrl: './create-loans.scss',
})
export class CreateLoans implements OnInit {
  // ==========================Implemantion===============================//
  ngOnInit(): void {
    this.getAllAccounts();
    this.CreateForm();
  }

  constructor(
    private ref: DynamicDialogRef,
    private panel: panel,
    private Data: Data,
    private FB: FormBuilder,
  ) {}

  //=========================Varibels===============================//
  Form = signal<FormGroup>(new FormGroup({}));
  accounts = signal([]);

  // =========================Functions=============================== //
  getAllAccounts() {
    this.panel.Accounts$.subscribe((res) => {
      this.accounts.set(res);
    });
  }

  CreateForm() {
    this.Form.set(
      this.FB.group({
        amount: ['', Validators.required],
        accountId: ['', Validators.required],
      }),
    );
  }

  onSubmit() {
    if (this.Form().invalid) {
      this.Form().markAllAsTouched();
      return;
    }

    this.Data.post(`Loans/apply`, this.Form().value).subscribe((res) => {
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
