import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path:'admin',
    component:WelcomeComponent
  },
  {
    path:'',
    component:AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
