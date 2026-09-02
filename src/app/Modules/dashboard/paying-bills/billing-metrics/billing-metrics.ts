import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Data } from '../../../../core/Servies/data';
import { panel } from '../../panel.service';

@Component({
  selector: 'app-billing-metrics',
  standalone: false,
  templateUrl: './billing-metrics.html',
  styleUrl: './billing-metrics.scss',
})
export class BillingMetrics {
  constructor(
    private Data: Data,
    private Panel: panel,
  ) {}

  customers = signal<any[]>([]);
  @Output() selectedCustomerId = new EventEmitter<string>();

  ngOnInit(): void {
    this.getAllCustmers();
  }

  getAllCustmers() {
    this.Panel.Customers$.subscribe((res) => {
      this.customers.set(res);
    });
  }

  onSelectCustomer(event: { value: any }) {
    const selectedCustomerId = event.value;
    this.selectedCustomerId.emit(selectedCustomerId);
  }
}
