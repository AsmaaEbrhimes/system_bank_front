import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { Data } from '../../../core/Servies/data';
import { DialogService } from 'primeng/dynamicdialog';
import { AddCustmerAndCreateAccount } from './add-custmer-and-create-account/add-custmer-and-create-account';

@Component({
  selector: 'app-custmers',
  standalone: false,
  templateUrl: './custmers.html',
  styleUrl: './custmers.scss',
})
export class Custmers {
  //=========================Implemantion===============================//

  ngOnInit(): void {
    this.getData();
  }

  constructor(
    private Data: Data,
    private dialogService: DialogService,
  ) {}
  //=========================Varibels===============================//
  data = signal<any>([]);
  accounts = signal<any>([]);
  @ViewChild('accountsSection', { read: ElementRef }) accountsSection!: ElementRef;

  //=========================Functions===============================//

  getData() {
    this.Data.get(`Customers`).subscribe((res: any) => {
      this.data.set(res);
      this.bodyTabel();
    });
  }

  bodyTabel() {
    return [
      { key: 'Full Name', value: 'fullName' },
      { key: 'National ID', value: 'nationalId' },
      { key: 'Phone Number', value: 'phoneNumber' },
      { key: 'Created At', value: 'createdAt', type: 'date', format: 'dd/MM/yyyy' },
    ];
  }

  getAccounts(accounts: any) {
    this.accounts.set(accounts);
    setTimeout(() => {
      this.accountsSection?.nativeElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  }

  AddCustmer() {
    const ref: any = this.dialogService.open(AddCustmerAndCreateAccount, {
      width: '90%',
      style: {
        'max-width': '720px',
        width: '100%',
        'max-height': '100vh',
      },
      data: this.data(),
      modal: true,
      showHeader: false,
      baseZIndex: 99999999,

      contentStyle: {
        'border-radius': '24px',
        padding: '0',
        'overflow-y': 'auto',
        height: 'auto',
      },
    });

    ref.onClose.subscribe((message:any) => {
      if(message === 'success') {
        this.getData();
      }
    });
  }
}
