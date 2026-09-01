import { Component, OnInit, signal } from '@angular/core';
import { Data } from '../../../core/Servies/data';

@Component({
  selector: 'app-main-page',
  standalone: false,
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage implements OnInit {
  constructor(private Data: Data) {}

  ngOnInit(): void {
    this.getAllTransactions();
    this.getAllcards();
    this.getAllCustmers();
    this.getAllLoans();
  }

  transactions = signal<any>('');
  cards = signal<any>('');
  custmers = signal<any>('');
  loans = signal<any>('');

  getAllcards() {
    this.Data.get('Cards').subscribe((res) => {
      this.cards.set(res);
    });
  }

  getAllCustmers() {
    this.Data.get('Customers').subscribe((res) => {
      this.custmers.set(res);
    });
  }

  getAllTransactions() {
    this.Data.get('Transactions').subscribe((res) => {
      this.transactions.set(res);
    });
  }

  getAllLoans() {
    this.Data.get('Loans/pending-requests').subscribe((res) => {
      this.loans.set(res);
    });
  }
}
