import { ApprovedLoans } from './approved-loans/approved-loans';
import { Component, OnInit, signal } from '@angular/core';
import { Data } from '../../../core/Servies/data';
import { Core } from '../../../core/Servies/core';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateLoans } from './create-loans/create-loans';

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
    private dialogService: DialogService,
  ) {}
  //=========================Varibels===============================//
  active_tap = signal<number>(0);
  data = signal<any>([]);
  status = signal<string>('All');
  currentPage = signal<number>(1);
  CreateLoans = CreateLoans;
  ApprovedLoans = ApprovedLoans;

  // =========================Functions=============================== //

  getAllLoans() {
    const params = {
      status: this.status(),
      pageNumber: this.currentPage(),
    };
    this.Data.get('Loans/GetAllLoans', params).subscribe((res: any) => {
      this.data.set(res?.items);
      this.Core.originalDataStore.set(res?.items);
      this.boayTabel();
    });
  }

  boayTabel() {
    return [
      { key: 'installments', value: 'installments', type: 'template' },
      { key: 'Application Date', value: 'applicationDate', type: 'date', format: 'dd/MM/yyyy' },
      { key: 'Status', value: 'status', type: 'template' },
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

  OpenDilog(componet: any, rowData?: any) {
    let ref: any = this.dialogService.open(componet, {
      width: '40rem',
      modal: true,
      showHeader: false,
      baseZIndex: 9999999999,
      data: { item: rowData },
      contentStyle: {
        'border-radius': '24px',
        'text-align': 'end',
      },
    });
    ref.onClose.subscribe((message: any) => {
      if (message === 'success') {
        this.getAllLoans();
      }
    });
  }

  onReject(item: any) {
    this.Data.put(`Loans/${item?.id}/reject`, {}).subscribe((res) => {
      this.getAllLoans();
    });
  }

  onPageChanges(event: any) {
    this.currentPage.set(event);
    this.getAllLoans();
  }
}
