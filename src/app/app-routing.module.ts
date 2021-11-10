import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ClinicHistoryComponent } from './components/clinic-history/clinic-history.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { MyShiftsComponent } from './components/my-shifts/my-shifts.component';
import { PatientsComponent } from './components/patients/patients.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestClinicHistoryComponent } from './components/request-clinic-history/request-clinic-history.component';
import { RequestShiftsComponent } from './components/request-shifts/request-shifts.component';
import { ShiftsComponent } from './components/shifts/shifts.component';
import { RegisterComponent } from './components/welcome/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path:'history',
    component: ClinicHistoryComponent
  },
  {
    path:'statistics',
    component: EstadisticasComponent
  },
  {
    path:'patients',
    component: PatientsComponent
  },
  {
    path:'request-history',
    component: RequestClinicHistoryComponent
  },
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
