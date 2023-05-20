import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ErrorComponent } from './components/error/error.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ErrorComponent,
  ],
  imports: [
    SharedModule,
    CommonModule
  ]
})
export class AuthModule { }
