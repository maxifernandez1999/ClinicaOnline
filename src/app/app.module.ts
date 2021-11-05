import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeModule } from './components/welcome/welcome.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AdminModule } from './components/admin/admin.module';
import { RequestShiftsComponent } from './components/request-shifts/request-shifts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShiftsComponent } from './components/shifts/shifts.component';
import { MyShiftsComponent } from './components/my-shifts/my-shifts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ClinicHistoryComponent } from './components/clinic-history/clinic-history.component';
import { RequestClinicHistoryComponent } from './components/request-clinic-history/request-clinic-history.component';
import { PatientsComponent } from './components/patients/patients.component';
import { PdfComponent } from './components/pdf/pdf.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestShiftsComponent,
    ShiftsComponent,
    MyShiftsComponent,
    ProfileComponent,
    ClinicHistoryComponent,
    RequestClinicHistoryComponent,
    PatientsComponent,
    PdfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WelcomeModule,
    AdminModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
