import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { MyShiftsComponent } from './components/my-shifts/my-shifts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestShiftsComponent } from './components/request-shifts/request-shifts.component';
import { ShiftsComponent } from './components/shifts/shifts.component';
import { RegisterComponent } from './components/welcome/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path:'',
    component:WelcomeComponent
  },
  {
    path:'register',
    component:RegisterComponent
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
  },
  {
    path:'myShifts',
    component: MyShiftsComponent
  },
  {
    path:'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
