import { ActivatedRoute } from '@angular/router';
import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { Data } from '../../../../core/Servies/data';

@Component({
  selector: 'app-custmer-have-accounts',
  standalone: false,
  templateUrl: './custmer-have-accounts.html',
  styleUrl: './custmer-have-accounts.scss',
})
export class CustmerHaveAccounts implements OnInit {
  //=========================Implemantion===============================//
  ngOnInit(): void {
    this.GetDetailsAccount();
  }

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private Data: Data,
  ) {}

  //=========================Varibels===============================//
  data = signal<any>([]);



  //=========================Funcrions===============================//

  GetDetailsAccount() {
    let id_custmer = this.ActivatedRoute.snapshot.paramMap.get('id');
    if (id_custmer) {
      this.Data.get(`Customers/${id_custmer}`).subscribe((res) => {
        this.data.set(res);
      });
    }
  }


  get total(): number {
    return this.data().accounts.reduce((sum:number, a:any) => sum + a.balance, 0);
  }


}




