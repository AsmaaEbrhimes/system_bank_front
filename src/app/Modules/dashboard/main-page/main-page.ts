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
  }


  transactions=signal<any>("")

  getAllTransactions() {
    this.Data.get('Transactions').subscribe((res) => {this.transactions.set(res)});
  }
}
