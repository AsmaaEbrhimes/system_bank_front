import { Component, OnInit, signal } from '@angular/core';
import { Data } from '../../../core/Servies/data';

@Component({
  selector: 'app-paying-bills',
  standalone: false,
  templateUrl: './paying-bills.html',
  styleUrl: './paying-bills.scss',
})
export class PayingBills  {

  activeTab: 'unpaid' | 'paid' = 'unpaid';


  boadyTabel() {
    return [
      { key: 'Amount', value: 'amount' },
      { key: 'balance After', value: 'balanceAfter' },
      { key: 'CreatedAt', value: 'createdAt', type: 'date', format: 'dd/MM/yyyy' },
    ];
  }
}
