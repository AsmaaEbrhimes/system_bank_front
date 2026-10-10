import { Component, OnInit, signal } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Data } from '../../../../core/Servies/data';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-approved-loans',
  standalone: false,
  templateUrl: './approved-loans.html',
  styleUrl: './approved-loans.scss',
})
export class ApprovedLoans implements OnInit {
  // ==========================Implemantion===============================//
  ngOnInit(): void {

  }

  constructor(
    private ref: DynamicDialogRef,
    private Data:Data,
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
