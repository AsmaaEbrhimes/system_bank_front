import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '../../../core/Servies/data';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  //=========================Implementions=============================//
  ngOnInit(): void {
    this.createForm();
  }
  constructor(
    private FB: FormBuilder,
    private Data: Data,
  ) {}

  //=========================Varibels=============================//
  Form = signal<FormGroup>(new FormGroup({}));

  //=========================Functions=============================//
  createForm() {
    this.Form.set(
      this.FB.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmePassword: ['', Validators.required],
      }),
    );
  }

  onSubmit() {
    if (this.Form().invalid) {
      this.Form().markAllAsTouched();
      return;
    }
    this.Data.post('Auth/Register', this.Form().value).subscribe((res) => {});
  }

  getControlName(controlName: string) {
    return this.Form().get(controlName);
  }
}
