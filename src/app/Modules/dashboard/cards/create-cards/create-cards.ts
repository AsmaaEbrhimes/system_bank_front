import { Component, OnInit, signal } from '@angular/core';
import { Data } from '../../../../core/Servies/data';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-cards',
  standalone: false,
  templateUrl: './create-cards.html',
  styleUrl: './create-cards.scss',
})
export class CreateCards implements OnInit {
  //=========================Implemantion===============================//
  ngOnInit(): void {
    this.getAllAccounts();
  }

  constructor(private Data: Data ,     private ref: DynamicDialogRef,
) {}

  //=========================Varibels===============================//
  accounts = signal<any>([]);



  //=========================Functions===============================//
  getAllAccounts() {
    this.Data.get('Customers/Accounts').subscribe((res) => {
      this.accounts.set(res);
    });
  }

  onCloseDilog(){
    this.ref.close();
  }
}
