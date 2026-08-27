import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '../../../core/Servies/data';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  constructor(
    private FB: FormBuilder,
    private Data: Data,
    private Router: Router,
  ) {}
  ngOnInit(): void {
    this.CreateForm();
  }

  //=========================Varibels=============================//
  Form = signal<FormGroup>(new FormGroup({}));

  CreateForm() {
    this.Form.set(
      this.FB.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      }),
    );
  }

  OnSubmit() {
    if (this.Form().invalid) {
      this.Form().markAllAsTouched();
    }
    this.Data.post('Auth/Login', this.Form().value).subscribe((res) => {
      this.HandelResponseSuccess(res);
    });
  }

  HandelResponseSuccess(res: any) {
    this.Router.navigate(['/ContentDashboard']);
    sessionStorage.setItem("token",res.token)
  }

  getControlName(controlName: string) {
    return this.Form().get(controlName);
  }
}
