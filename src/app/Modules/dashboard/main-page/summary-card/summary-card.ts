import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  standalone: false,
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.scss',
})
export class SummaryCard {
  transactions = signal<any>('');
  cards = signal<any>('');
  custmers = signal<any>('');
  loans = signal<any>('');

  @Input()
  set CardsData(value: any) {
    this.cards.set(value);
  }

  @Input()
  set CustmersData(value: any) {
    this.custmers.set(value);
  }

  @Input()
  set TransactionsData(value: any) {
    this.transactions.set(value);
  }

  @Input()
  set loansData(value: any) {
    this.loans.set(value);
  }
}
