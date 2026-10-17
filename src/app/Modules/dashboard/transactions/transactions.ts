import { Core } from './../../../core/Servies/core';
import { Component, OnInit, signal } from '@angular/core';
import { Data } from '../../../core/Servies/data';
import { DialogService } from 'primeng/dynamicdialog';
import { ActionTransactionDialog } from './action-transaction-dialog/action-transaction-dialog';

@Component({
  selector: 'app-transactions',
  standalone: false,
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class Transactions implements OnInit {
  //===============================Implemantion================================//
  ngOnInit(): void {
    this.getDataTransactions();
  }

  constructor(
    private Data: Data,
    private Core: Core,
    private dialogService: DialogService,
  ) {}

  //===============================Vribels================================//
  data = signal<any>([]);

  //===============================Functions================================//

  getDataTransactions() {
    this.Data.get('Transactions').subscribe((res: any) => {
      this.data.set(res);
      this.Core.originalDataStore.set(res);
      this.bodyTabel();
    });
  }

  bodyTabel() {
    return [
      { key: 'Transaction Type', value: 'transactionType', type: 'template' },
      { key: 'Amount', value: 'amount' },
      { key: 'Created At', value: 'createdAt', type: 'date', format: 'dd/MM/yyyy' },
    ];
  }

  onShowDilogTransactions(type: string) {
    let ref = this.dialogService.open(ActionTransactionDialog, {
      width: '25rem',
      modal: true,
      showHeader: false,
      baseZIndex: 9999999999,
      contentStyle: {
        'border-radius': '24px',
        'text-align': 'end',
      },
    });

    ref?.onClose.subscribe((res) => {
      if (res == 'success') {
        this.getDataTransactions();
      }
    });
  }
}
