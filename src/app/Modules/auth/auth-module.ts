import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing-module';
import { Login } from './login/login';
import { Register } from './register/register';
import { AuthBanner } from './auth-banner/auth-banner';
import { SvgIconComponent } from 'angular-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [Login, Register, AuthBanner],
  imports: [CommonModule, AuthRoutingModule,SvgIconComponent , ReactiveFormsModule],
})
export class AuthModule {}
