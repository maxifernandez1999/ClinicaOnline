import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome.component';
import { NgxCaptchaModule } from 'ngx-captcha';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ]
})
export class WelcomeModule { }
