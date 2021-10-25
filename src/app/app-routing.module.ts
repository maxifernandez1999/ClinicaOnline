import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { RequestShiftsComponent } from './components/request-shifts/request-shifts.component';
import { ShiftsComponent } from './components/shifts/shifts.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path:'',
    component:WelcomeComponent
  },
  {
    path:'admin',
    component:AdminComponent
  },
  {
    path:'shiftsLoad',
    component: RequestShiftsComponent
  },
  {
    path:'shifts',
    component: ShiftsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
