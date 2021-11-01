import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { Patient } from 'src/app/models/Patient';
import { Specialist } from 'src/app/models/Specialist';
import { ShiftsService } from 'src/app/services/shifts.service';
import { UsersService } from 'src/app/services/users.service';
/// <reference types="jquery" />

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
  specialist:string;
  speciality:string;
  specialities:string[] = [];
  specialists:string[] = [];
  patientsName:string[] = [];
  showSpecialities:boolean = false;
  showShifts:boolean = false;
  ShiftAvailable:string;
  selected:boolean = false;
  constructor(private readonly shiftsService: ShiftsService,
              private fb:FormBuilder,
              private router:Router,
              private userService:UsersService,
              private renderer:Renderer2) { }


  ngOnInit(): void {
    this.initForm();
    this.getData();
    this.getDataPatients();
    this.localStorageData();
    
  }

  get patientNameControl():any{
    return this.formShifts.get('patientName').value;
  }
  

  public get Form():any{
    return this.formShifts.controls;
  }

  getSpecialistSelected(specialist:string,e:any):void{
    e.target.className = 'btn btn-danger m-3'
    $(".btn-success").prop('disabled', true);
    this.specialist = specialist;
    this.showSpecialities = true;
  }
  getSpecialitySelected(speciality:string,e:any):void{
    e.target.className = 'btn btn-danger m-3'
    $(".btn-info").prop('disabled', true);
    this.speciality = speciality;
    this.showShifts = true
  }

  getShifts(e:any):void{
    
    this.ShiftAvailable = e.target.innerHTML
    $("#btn").prop('disabled', false);
    console.log(this.getDateAndTime())
    console.log(this.specialist)
    console.log(this.speciality)
    console.log(this.ShiftAvailable)
  }
  localStorageData():void{
    if(localStorage.hasOwnProperty("administrator")){
      this.isAdmin = true;
    }else if(localStorage.hasOwnProperty("patient")){
      this.isPatient = true;
    }else{
      this.router.navigate(['/'])
    }
  }
  getDataLocalStorage(user:string):Patient | Specialist{
    return JSON.parse(localStorage.getItem(user));
  }

  isSelected(){
    this.selected = true;
  }
  initForm():void{
    this.formShifts = this.fb.group({
      patientName: [
        '',
        [
          Validators.required
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

  getDateAndTime(){
    return this.ShiftAvailable.split(' ');
  }
  addShift(){
    
    if(this.isAdmin){
      if(this.selected){
        this.shiftsService.addShift({
          patientName: this.patientNameControl,
          specialist: this.specialist,
          speciality: this.speciality,
          date: this.getDateAndTime()[0],
          time: this.getDateAndTime()[1]
        }).then(res => {
          console.log(res);
          window.location.reload();
        }).catch(err => {
          console.log(err);    
        });
      }else{
        alert('seleccione un paciente');
      }
      
      
    }else if(this.isPatient){
      this.shiftsService.addShift({
        patientName: this.getDataLocalStorage("patient").firstName,
        specialist: this.specialist,
        speciality: this.speciality,
        date: this.getDateAndTime()[0],
        time: this.getDateAndTime()[1]
      }).then(res => {
        console.log(res);
        window.location.reload();
      }).catch(err => {
        console.log(err);    
      });
      
    }
    
  }

}
