import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { Patient } from 'src/app/models/Patient';
import { Shift } from 'src/app/models/Shift';
import { Specialist } from 'src/app/models/Specialist';
import { ShiftsService } from 'src/app/services/shifts.service';

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
  constructor(private readonly shiftsService: ShiftsService,
              private fb:FormBuilder,
              private router:Router) { }


  ngOnInit(): void {
    this.initForm();
    this.localStorageData();
  }

  get patientNameControl():AbstractControl{
    return this.formShifts.get('patientName').value;
  }
  get specialistControl():AbstractControl{
    return this.formShifts.get('specialist').value;
  }
  get specialityControl():AbstractControl{
    return this.formShifts.get('speciality').value;
  }
  get dayControl():AbstractControl{
    return this.formShifts.get('day').value;
  }
  get monthControl():AbstractControl{
    return this.formShifts.get('month').value;
  }
  get hourControl():AbstractControl{
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
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      specialist: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      speciality: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      day: [
        '',
        [
          Validators.required,
          Validators.max(15)
        ]
      ],
      month: [
        '',
        [
          Validators.required,
          Validators.max(15)
        ]
      ],
      hour: [
        '',
        [
          Validators.required,
          Validators.max(15)
        ]
      ]
    });
  }

  addShift(){
    if(this.isAdmin){
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
