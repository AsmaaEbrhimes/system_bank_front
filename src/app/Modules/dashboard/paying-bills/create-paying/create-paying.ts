import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { panel } from '../../panel.service';
import { Data } from '../../../../core/Servies/data';

@Component({
  selector: 'app-create-paying',
  standalone: false,
  templateUrl: './create-paying.html',
  styleUrl: './create-paying.scss',
})
export class CreatePaying implements OnInit {
  //=========================Implemantions=============================//
  ngOnInit(): void {
    this.createForm();
    this.getAllCustmers();
  }

  constructor(
    private ref: DynamicDialogRef,
    private FB: FormBuilder,
    private Panel: panel,
    private Data: Data,
  ) {}

  //=========================Varibels=============================//
  Form = signal<FormGroup>(new FormGroup({}));
  customers = signal<any[]>([]);

  //=========================Functions=============================//
  createForm() {
    this.Form.set(
      this.FB.group({
        title: ['', [Validators.required]],
        category: ['', [Validators.required]],
        dateTime: ['', [Validators.required]],
        amount: ['', [Validators.required, Validators.min(0)]],
        customerId: ['', [Validators.required]],
      }),
    );
  }

  getAllCustmers() {
    this.Panel.Customers$.subscribe((res) => {
      this.customers.set(res);
    });
  }

  onSubmit() {
    this.Data.post('Bill', this.Form().value).subscribe((res) => {
      this.onCloseDilog();
      this.Form().reset();
    });
  }

  onCloseDilog() {
    this.ref.close();
  }
}
