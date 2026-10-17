import { Component, OnInit, signal } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { panel } from '../../panel.service';
import { Data } from '../../../../core/Servies/data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-action-transaction-dialog',
  standalone: false,
  templateUrl: './action-transaction-dialog.html',
  styleUrl: './action-transaction-dialog.scss',
})
export class ActionTransactionDialog implements OnInit {
  // ==========================Implemantion===============================//

  ngOnInit(): void {
    this.getDataTransactions();
    this.getAllAccounts();
    this.createForm();
  }

  constructor(
    private ref: DynamicDialogRef,
    private panel: panel,
    private Data: Data,
    private FB: FormBuilder,
    private config: DynamicDialogConfig,
  ) {}

  //=========================Varibels===============================//
  Form = signal<FormGroup>(new FormGroup({}));
  data_transactions = signal<any>({});
  accounts = signal([]);

  // =========================Functions=============================== //

  getDataTransactions() {
    this.data_transactions.set(this.config.data);
  }

  getAllAccounts() {
    this.panel.Accounts$.subscribe((res) => {
      this.accounts.set(res);
    });
  }

  createForm() {
    const isTransfer = this.data_transactions().transfared == true;
    this.Form.set(
      this.FB.group({
        accountId: ['', Validators.required],
        amount: ['', Validators.required],
        toAccountId: ['', isTransfer ? Validators.required : ''],
      }),
    );
  }

  onSubmit() {
    if (this.Form().invalid) {
      this.Form().markAllAsTouched();
      return;
    }

    let accountId = this.Form().get('accountId')?.value;
    let amount = this.Form().get('amount')?.value;
    const toAccountId = this.Form().get('toAccountId')?.value;

    // *************************Deposit Action*********************************//
    if (this.data_transactions().title == 'Deposit') {
      this.Data.post(`Transactions/deposit?accountId=${accountId}&amount=${amount}`, {}).subscribe(
        (res) => {
          this.onCloseDilog();
        },
      );

      // *************************Withdraw Action*********************************//
    } else if (this.data_transactions().title == 'Withdraw') {
      this.Data.post(`Transactions/withdraw?accountId=${accountId}&amount=${amount}`, {}).subscribe(
        (res) => {
          this.onCloseDilog();
        },
      );

      // *************************Transfer Action*********************************//
    } else {
      this.Data.post(
        `Transactions/transfer?fromAccountId=${accountId}&toAccountId=${toAccountId}&amount=${amount}`,
        {},
      ).subscribe(() => {
        this.onCloseDilog();
      });
    }
  }

  onCloseDilog() {
    this.ref.close('success');
    this.Form().reset();
  }

  getControlName(controlName: string) {
    return this.Form().get(controlName);
  }
}
