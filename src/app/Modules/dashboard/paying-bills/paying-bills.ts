import { Component, OnInit, signal } from '@angular/core';
import { Data } from '../../../core/Servies/data';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreatePaying } from './create-paying/create-paying';

@Component({
  selector: 'app-paying-bills',
  standalone: false,
  templateUrl: './paying-bills.html',
  styleUrl: './paying-bills.scss',
})
export class PayingBills {
  activeTab: 'unpaid' | 'paid' = 'paid';
  IdCustomer = signal<number | null>(null);
  data = signal<any[]>([]);
  ref: DynamicDialogRef | any;

  constructor(
    private Data: Data,
    private dialogService: DialogService,
  ) {}

  boadyTabel() {
    return [
      { key: 'title Name', value: 'title' },
      { key: 'Paid Status', value: 'status' },
      { key: 'Created At', value: 'dateTime', type: 'date', format: 'dd/MM/yyyy' },
    ];
  }

  onSelectCustomer(selectedCustomerId: string) {
    this.IdCustomer.set(Number(selectedCustomerId));
    this.onActiveTap(this.activeTab);
  }

  onActiveTap(tab: 'unpaid' | 'paid' = 'paid') {
    this.activeTab = tab;
    let status = tab === 'paid' ? true : false;
    this.Data.get(`Bill/customer/${this.IdCustomer()}/all?status=${status}`).subscribe(
      (res: any) => {
        this.data.set(res);
      },
    );
  }

  onOpenComponentCreateInvoice() {
      this.ref = this.dialogService.open(CreatePaying, {
      width: '25rem',
      modal: true,
      showHeader: false,
      contentStyle: {
      'border-radius': '24px',
      'padding': '2.2rem 1.8rem 1.6rem',
      'text-align': 'center'
    }
    });
  }
}
