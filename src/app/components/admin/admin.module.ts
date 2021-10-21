import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdministratorComponent } from './administrator/administrator.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdministratorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
