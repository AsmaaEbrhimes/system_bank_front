import { Component, OnInit, signal } from '@angular/core';
import { Data } from '../../../../core/Servies/data';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Core } from '../../../../core/Servies/core';

@Component({
  selector: 'app-create-cards',
  standalone: false,
  templateUrl: './create-cards.html',
  styleUrl: './create-cards.scss',
})
export class CreateCards implements OnInit {
  //=========================Implemantion===============================//
  ngOnInit(): void {
    this.getAllAccounts();
    this.CreateForm();
    this.listenPinChangese();
  }

  constructor(
    private Data: Data,
    private ref: DynamicDialogRef,
    private FB: FormBuilder,
    private Core: Core,
  ) {}

  //=========================Varibels===============================//
  accounts = signal<any>([]);
  Form = signal<FormGroup>(new FormGroup({}));

  //=========================Functions===============================//
  getAllAccounts() {
    this.Data.get('Customers/Accounts').subscribe((res) => {
      this.accounts.set(res);
    });
  }

  CreateForm() {
    this.Form.set(
      this.FB.group({
        accountId: ['', Validators.required],
        pin: ['', [Validators.required, Validators.pattern('^[0-9]{4}$'), Validators.minLength(4)]],
        cardType: ['', Validators.required],
      }),
    );
  }

  listenPinChangese() {
    this.Form()
      .get('pin')
      ?.valueChanges.subscribe((pin) => {
        if (pin && pin.length == 4) {
          this.ExsistPin(pin);
          this.Core._loading.next(false);
        }
      });
  }

  ExsistPin(event: any) {
    let payload = {
      pin: event,
    };
    const newPinControl = this.getControlName('pin');
    this.Data.post(`Cards/check-pin`, payload).subscribe((res: any) => {
      this.Core._Sussess.next('');
      if (res?.isUsed) {
        newPinControl?.setErrors({ ...newPinControl.errors, pinExists: true });
      } else {
        if (newPinControl?.hasError('pinExists')) {
          const errors = { ...newPinControl.errors };
          delete errors['pinExists'];
          newPinControl.setErrors(Object.keys(errors).length ? errors : null);
        }
      }
    });
  }

  OnSubmit() {
    if (this.Form().invalid) {
      this.Form().markAllAsTouched();
      return;
    }
    this.Data.post('Cards/request', this.Form().value).subscribe((res) => {
      this.onCloseDilog();
    });
  }

  onCloseDilog() {
    this.ref.close();
  }

  getControlName(controlName: string) {
    return this.Form().get(controlName);
  }
}
