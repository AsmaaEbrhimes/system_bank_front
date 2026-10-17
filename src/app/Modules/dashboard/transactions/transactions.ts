import { Core } from './../../../core/Servies/core';
import { Component, OnInit, signal } from '@angular/core';
import { Data } from '../../../core/Servies/data';

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
  ) {}

  //===============================Vribels================================//
  // selectedFilterIndex: number = 0;
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

  // setFilter(index: number) {
  //   this.selectedFilterIndex = index;
  // }
}
