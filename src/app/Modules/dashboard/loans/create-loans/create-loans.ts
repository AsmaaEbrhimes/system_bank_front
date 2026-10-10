import { panel } from './../../panel.service';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Data } from '../../../../core/Servies/data';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-loans',
  standalone: false,
  templateUrl: './create-loans.html',
  styleUrl: './create-loans.scss',
})
export class CreateLoans implements OnInit {
  // ==========================Implemantion===============================//
  ngOnInit(): void {
    this.getAllAccounts();
  }

  
  constructor(
    private ref: DynamicDialogRef,
    private panel: panel,
    private Data: Data,
    private FB: FormBuilder,
  ) {}

  //=========================Varibels===============================//

  // =========================Functions=============================== //
  onCloseDilog() {
    this.ref.close();
  }
  getAllAccounts() {
    this.panel.Accounts$.subscribe((res) => {});
  }
}
