import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { Patient } from 'src/app/models/Patient';
import { Specialist } from 'src/app/models/Specialist';
import { ShiftsService } from 'src/app/services/shifts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-request-shifts',
  templateUrl: './request-shifts.component.html',
  styleUrls: ['./request-shifts.component.scss']
})
export class RequestShiftsComponent implements OnInit {

  formShifts : FormGroup;
  subscription:Subscription;
  isPatient:boolean = false;
  isAdmin:boolean = false;

  specialities:string[] = [];
  specialists:string[] = [];
  patientsName:string[] = [];
  constructor(private readonly shiftsService: ShiftsService,
              private fb:FormBuilder,
              private router:Router,
              private userService:UsersService) { }


  ngOnInit(): void {
    this.initForm();
    this.getData();
    this.getDataPatients();
    this.localStorageData();
    
  }

  get patientNameControl():any{
    return this.formShifts.get('patientName').value;
  }
  get specialistControl():any{
    return this.formShifts.get('specialist').value;
  }
  get specialityControl():any{
    return this.formShifts.get('speciality').value;
  }
  get dayControl():any{
    return this.formShifts.get('day').value;
  }
  get monthControl():any{
    return this.formShifts.get('month').value;
  }
  get hourControl():any{
    return this.formShifts.get('hour').value;
  }

  public get Form():any{
    return this.formShifts.controls;
  }

  // getInfoLogin():void{
  //   this.subscription = this.shiftsService.communicatorLogin$.subscribe(res => {
  //     if(res === "patient"){
  //       this.isPatient = true;
  //     }else if(res === "administrator"){
  //       this.isAdmin = true;
  //     }else{
  //       console.log("specialist")
  //     }
  //   });
  // }

  localStorageData():void{
    if(localStorage.hasOwnProperty("administrator")){
      this.isAdmin = true;
    }else if(localStorage.hasOwnProperty("patient")){
      this.isAdmin = true;
    }else{
      this.router.navigate(['/'])
    }
  }
  getDataLocalStorage(user:string):Patient | Specialist{
    return JSON.parse(localStorage.getItem(user));
  }

  initForm():void{
    this.formShifts = this.fb.group({
      patientName: [
        '',
        [
          Validators.required
        ]
      ],
      specialist: [
        '',
        [
          Validators.required
        ]
      ],
      speciality: [
        '',
        [
          Validators.required
        ]
      ],
      day: [
        '',
        [
          Validators.required,
          Validators.max(30)
        ]
      ],
      month: [
        '',
        [
          Validators.required,
          Validators.max(12)
        ]
      ],
      hour: [
        '',
        [
          Validators.required,
          Validators.max(24)
        ]
      ]
    });
  }

  getData():void{
    this.userService.Specialists.subscribe(res => {
      res.forEach(r => {
        this.specialities.push(r.data().speciality);
        this.specialists.push(r.data().firstName + ' ' + r.data().lastName);
      });
    });
  }
  getDataPatients():void{
    this.userService.Patients.subscribe(res => {
      res.forEach(r => {
        this.patientsName.push(r.data().firstName);
      });
    });
  }
  addShift(){
    if(this.isAdmin){
      console.log(this.dayControl)
      this.shiftsService.addShift({
        patientName: this.patientNameControl,
        specialist: this.specialistControl,
        speciality: this.specialityControl,
        date: this.dayControl +'/'+ this.monthControl,
        time: this.hourControl
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);    
      });
    }else if(this.isPatient){
      this.shiftsService.addShift({
        patientName: this.getDataLocalStorage("patient").firstName,
        specialist: this.specialistControl,
        speciality: this.specialityControl,
        date: this.dayControl +'/'+ this.monthControl,
        time: this.hourControl
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);    
      });
    }
    
  }

}
