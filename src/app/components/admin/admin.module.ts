import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminComponent,
    AdministratorComponent,
    RegisterAdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
