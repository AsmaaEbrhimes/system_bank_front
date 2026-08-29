import { Component, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-tabel-transations',
  standalone: false,
  templateUrl: './tabel-transations.html',
  styleUrl: './tabel-transations.scss',
})
export class TabelTransations {
  data = signal<any[]>([]);

  @Input()
  set Transactions(value: any) {
    this.data.set(value);
    this.boadyTabel();
  }

  boadyTabel() {
    return [
      { key: 'Amount', value: 'amount' },
      { key: 'balance After', value: 'balanceAfter' },
      { key: 'CreatedAt', value: 'createdAt', type: 'date', format: 'dd/MM/yyyy' },
    ];
  }
}
