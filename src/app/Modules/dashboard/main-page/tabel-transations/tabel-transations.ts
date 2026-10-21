import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { Core } from '../../../../core/Servies/core';

@Component({
  selector: 'app-tabel-transations',
  standalone: false,
  templateUrl: './tabel-transations.html',
  styleUrl: './tabel-transations.scss',
})
export class TabelTransations {
  constructor(private Core: Core) {}
  data = signal<any[]>([]);
  @Output() pageChangeTranactions = new EventEmitter<number>();

  @Input()
  set Transactions(value: any) {
    this.data.set(value?.items);
    this.Core.originalDataStore.set(this.data());
    this.bodyTabel();
  }

  bodyTabel() {
    return [
      { key: 'Transaction Type', value: 'transactionType', type: 'template' },
      { key: 'Amount', value: 'amount' },
      { key: 'Created At', value: 'createdAt', type: 'date', format: 'dd/MM/yyyy' },
    ];
  }

  OnPagnaotor(event: any) {
    this.pageChangeTranactions.emit(event);
  }
}
