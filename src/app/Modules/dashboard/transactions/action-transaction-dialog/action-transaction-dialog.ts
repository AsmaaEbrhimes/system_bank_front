import { Component, signal } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { panel } from '../../panel.service';
import { Data } from '../../../../core/Servies/data';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-action-transaction-dialog',
  standalone: false,
  templateUrl: './action-transaction-dialog.html',
  styleUrl: './action-transaction-dialog.scss',
})
export class ActionTransactionDialog {
  // ==========================Implemantion===============================//
  constructor(
    private ref: DynamicDialogRef,
    private panel: panel,
    private Data: Data,
    private FB: FormBuilder,
  ) {}

  //=========================Varibels===============================//
  Form = signal<FormGroup>(new FormGroup({}));

  // =========================Functions=============================== //
  onCloseDilog() {
    this.ref.close('success');
    this.Form().reset();
  }
}
