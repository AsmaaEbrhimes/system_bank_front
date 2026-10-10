import { Component, OnInit, signal } from '@angular/core';
import { Data } from '../../../core/Servies/data';
import { Core } from '../../../core/Servies/core';

@Component({
  selector: 'app-loans',
  standalone: false,
  templateUrl: './loans.html',
  styleUrl: './loans.scss',
})
export class Loans implements OnInit {
  // ==========================Implemantion===============================//
  ngOnInit(): void {
    this.getAllLoans();
  }

  constructor(
    private Data: Data,
    private Core: Core,
  ) {}
  //=========================Varibels===============================//
  active_tap = signal<number>(0);
  data = signal<any>([]);
  status = signal<string>('All');

  // =========================Functions=============================== //

  getAllLoans() {
    const params = {
      status: this.status(),
    };
    this.Data.get('Loans/GetAllLoans', params).subscribe((res: any) => {
      this.data.set(res);
      this.Core.originalDataStore.set(res);
      this.boayTabel();
    });
  }

  boayTabel() {
    return [
      { key: 'Application Date', value: 'applicationDate', type: 'date', format: 'dd/MM/yyyy' },
      { key: 'Status', value: 'status' },
      { key: 'Monthly Installment', value: 'monthlyInstallment' },
      { key: 'Total Amount Payable', value: 'totalAmountPayable' },
      { key: 'Interest Rate', value: 'interestRate' },
      { key: 'Duration In Months', value: 'durationInMonths' },
      { key: 'Amount', value: 'amount' },
    ];
  }

  SetActive(number: number) {
    this.active_tap.set(number);
  }

  GetLoansWithStstus(status: string) {
    this.status.set(status);
    this.getAllLoans();
  }
}
