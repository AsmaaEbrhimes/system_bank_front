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
      { key: 'Title', value: 'title' },
      { key: 'Category', value: 'category' },
      { key: 'Paid Status', value: 'status' },
      { key: 'Due date', value: 'dateTime', type: 'date', format: 'dd/MM/yyyy' },
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
        'text-align': 'center',
      },
    });
  }

  onPaymentInvoice(row: any) {
    console.log(row);
    this.Data.put(`Bill/${row.id}/pay`, { accountId: row.accountId }).subscribe((res: any) => {
      this.onActiveTap(this.activeTab);
    });
  }

  getCount(isPaidStatus: boolean): number {
    return this.data().filter((item) => item.isPaid === isPaidStatus).length;
  }
}
