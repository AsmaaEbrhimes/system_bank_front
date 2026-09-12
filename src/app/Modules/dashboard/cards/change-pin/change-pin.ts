import { Component, OnInit, signal } from '@angular/core';
import { Data } from '../../../../core/Servies/data';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-pin',
  standalone: false,
  templateUrl: './change-pin.html',
  styleUrl: './change-pin.scss',
})
export class ChangePin implements OnInit {
  //=========================Implemantion===============================//
  ngOnInit(): void {
    this.GetIdCards();
    this.CreateForm();
  }
  constructor(
    private Data: Data,
    private ref: DynamicDialogRef,
    private FB: FormBuilder,
    private config: DynamicDialogConfig,
  ) {}

  //=========================Varibels===============================//
  Form = signal<FormGroup>(new FormGroup({}));
  cardId = signal<number>(0);

  //=========================Functions===============================//

  GetIdCards() {
    this.cardId.set(this.config.data?.id);
  }

  CreateForm() {
    this.Form.set(
      this.FB.group({
        oldPin: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{4}$'), Validators.minLength(4)],
        ],
        newPin: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{4}$'), Validators.minLength(4)],
        ],
      }),
    );
  }

  onSubmit() {
    if (this.Form().invalid) {
      this.Form().markAllAsTouched();
      return;
    }
    this.Data.put(`Cards/${this.cardId()}/change-pin`, this.Form().value).subscribe((res) => {
      this.onCloseDilog();
    });
  }

  onCloseDilog() {
    this.ref.close();
    this.Form().reset();
  }

  getControlName(controlName: string) {
    return this.Form().get(controlName);
  }
}
