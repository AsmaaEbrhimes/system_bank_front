import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Data } from '../../../../core/Servies/data';
import { panel } from '../../panel.service';

@Component({
  selector: 'app-billing-metrics',
  standalone: false,
  templateUrl: './billing-metrics.html',
  styleUrl: './billing-metrics.scss',
})
export class BillingMetrics {
  //===============================Implemantion================================//
  constructor(
    private Data: Data,
    private Panel: panel,
  ) {}

  ngOnInit(): void {
    this.getAllCustmers();
  }

  //===============================Vribels================================//
  customers = signal<any[]>([]);
  all_invoice = signal<any[]>([]);

  //===============================Input & Output================================//
  @Output() selectedCustomerId = new EventEmitter<string>();

  @Input()
  set data(value: any) {
    this.all_invoice.set(value);
  }

  //===============================Functions================================//
  getAllCustmers() {
    this.Panel.Customers$.subscribe((res) => {
      this.customers.set(res);
    });
  }

  onSelectCustomer(event: { value: any }) {
    const selectedCustomerId = event.value;
    this.selectedCustomerId.emit(selectedCustomerId);
  }

  get TotalDue(): number {
    return (
      this.all_invoice()
        ?.filter((ele) => ele.isPaid == false)
        .reduce((acc, b) => acc + b.amount, 0) || 0
    );
  }

  get TotalPaid(): number {
    return (
      this.all_invoice()
        ?.filter((ele) => ele.isPaid == true)
        .reduce((acc, b) => acc + b.amount, 0) || 0
    );
  }

  get HighestInvoiceAmount(): number {
    const invoices = this.all_invoice();
    if (!invoices || invoices.length === 0) return 0;
    return Math.max(...invoices.map((b) => b.amount));
  }
}
