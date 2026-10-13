import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data } from '../../../../core/Servies/data';
import { Core } from '../../../../core/Servies/core';

@Component({
  selector: 'app-show-installment-relations-loan',
  standalone: false,
  templateUrl: './show-installment-relations-loan.html',
  styleUrl: './show-installment-relations-loan.scss',
})
export class ShowInstallmentRelationsLoan implements OnInit {
  // ==========================Implemantion===============================//
  ngOnInit(): void {
    this.getIdParams();
  }

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private Data: Data,
    private Core:Core
  ) {}

  //=========================Varibels===============================//
  installments = signal<any>([]);
  // =========================Functions=============================== //
  getIdParams() {
    let LoanId = this.ActivatedRoute.snapshot.paramMap.get('id');
    if (LoanId) {
      this.Data.get(`Installments/${LoanId}`).subscribe((res: any) => {
        this.installments.set(res);
        this.Core.originalDataStore.set(res)
        this.boayTabel();
      });
    }
  }

  boayTabel() {
    return [
      { key: 'Name', value: 'name' },
      { key: 'Amount', value: 'amount' },
      { key: 'Status', value: 'status', type: 'template' },
      { key: 'Paymet Date', value: 'paymentDate', type: 'date', format: 'dd/MM/yyyy' },
    ];
  }

}
