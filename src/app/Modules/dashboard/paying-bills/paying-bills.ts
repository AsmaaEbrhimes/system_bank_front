import { Panel } from './../Panel/Panel';
import { Data } from './../../../core/Servies/data';
import { Component, OnInit, signal } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreatePaying } from './create-paying/create-paying';
import { Core } from '../../../core/Servies/core';
import { panel } from '../panel.service';

@Component({
  selector: 'app-paying-bills',
  standalone: false,
  templateUrl: './paying-bills.html',
  styleUrl: './paying-bills.scss',
})
export class PayingBills implements OnInit {
  //===============================Implemantion================================//
  constructor(
    private Data: Data,
    private dialogService: DialogService,
    private Core: Core,
    private Panel: panel,
  ) {}

  ngOnInit(): void {
    this.getAllPaying();
  }
  //===============================Vribels================================//
  activeTab: 'unpaid' | 'paid' = 'paid';
  IdCustomer = signal<number | null>(null);
  data = signal<any[]>([]);
  ref: DynamicDialogRef | any;
  PageTransactions = signal<number>(1);

  //===============================Functions================================//

  getAllPaying() {
    let params = {
      pageNumber: this.PageTransactions(),
    };
    this.Data.get('Bill/all', params).subscribe((res: any) => {
      this.data.set(res?.items);
      this.Core.originalDataStore.set(res?.items);
    });
  }

  boadyTabel() {
    return [
      { key: 'Title', value: 'title' },
      { key: 'Category', value: 'category' },
      { key: 'Paid Status', value: 'status' },
      { key: 'Amount', value: 'amount' },
      { key: 'Due date', value: 'dateTime', type: 'date', format: 'dd/MM/yyyy' },
    ];
  }

  onSelectCustomer(selectedCustomerId: string) {
    this.IdCustomer.set(Number(selectedCustomerId));
    this.onActiveTap(this.activeTab);
  }

  onActiveTap(tab: 'unpaid' | 'paid' = 'paid') {
    let exststCustmer = this.IdCustomer() ? this.IdCustomer() : '';
    this.activeTab = tab;
    let status = tab === 'paid' ? true : false;
    this.Data.get(`Bill/all?customerId=${exststCustmer}&status=${status}`).subscribe((res: any) => {
      this.data.set(res?.items);
      this.Core.originalDataStore.set(this.data());
    });
  }

  onOpenComponentCreateInvoice() {
    this.ref = this.dialogService.open(CreatePaying, {
      width: '25rem',
      modal: true,
      showHeader: false,
      baseZIndex: 9999999999,
      contentStyle: {
        'border-radius': '24px',
        'text-align': 'end',
      },
    });
  }

  onPaymentInvoice(row: any) {
    this.Data.put(`Bill/${row.id}/pay`, { accountId: row.accountId }).subscribe((res: any) => {
      this.onActiveTap(this.activeTab);
      this.Panel.triggerRefresh();
      this.getAllPaying();
    });
  }

  getCount(isPaidStatus: boolean): number {
    return this.data().filter((item) => item.isPaid === isPaidStatus).length;
  }

  onPageChanges(event: any) {
    this.PageTransactions.set(event);

    if (this.activeTab) {
      this.onActiveTap(this.activeTab);
    } else {
      this.getAllPaying();
    }
  }
}
