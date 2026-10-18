import { Component, Input, OnInit, signal } from '@angular/core';
import { Core } from '../../../../core/Servies/core';

@Component({
  selector: 'app-tabel-transations',
  standalone: false,
  templateUrl: './tabel-transations.html',
  styleUrl: './tabel-transations.scss',
})
export class TabelTransations {
  constructor(private Core:Core){ }
  data = signal<any[]>([]);

  @Input()
  set Transactions(value: any) {
    this.data.set(value);
    this.Core.originalDataStore.set(this.data())
    this.bodyTabel();
  }

  bodyTabel() {
    return [
      { key: 'Transaction Type', value: 'transactionType', type: 'template' },
      { key: 'Amount', value: 'amount' },
      { key: 'Created At', value: 'createdAt', type: 'date', format: 'dd/MM/yyyy' },
    ];
  }
}
