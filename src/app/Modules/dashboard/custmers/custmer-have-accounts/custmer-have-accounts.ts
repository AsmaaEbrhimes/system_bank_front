import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-custmer-have-accounts',
  standalone: false,
  templateUrl: './custmer-have-accounts.html',
  styleUrl: './custmer-have-accounts.scss',
})
export class CustmerHaveAccounts {
  //=========================Implemantion===============================//

  //=========================Varibels===============================//
    data = signal<any>([]);


  //=========================Input & Output===============================//
  @Input()
  set AccountsCustmer(value: any) {
    this.data.set(value)
  }

  //=========================Functions===============================//


TotalBalanceInAccounting(): number {
  return this.data().reduce((acc: number, item: any) => acc + (item.balance || 0), 0) || 0;
}
}
