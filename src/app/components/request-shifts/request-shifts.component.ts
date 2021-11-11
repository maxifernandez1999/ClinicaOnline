import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { Patient } from 'src/app/models/Patient';
import { Specialist } from 'src/app/models/Specialist';
import { ShiftsService } from 'src/app/services/shifts.service';
import { UsersService } from 'src/app/services/users.service';
import { trigger, style, transition, animate, state, animation } from '@angular/animations';
/// <reference types="jquery" />

@Component({
  selector: 'app-request-shifts',
  templateUrl: './request-shifts.component.html',
  styleUrls: ['./request-shifts.component.scss'],
  animations: [
    trigger('enterState',[
      state('void',style({
        transform: 'scale(1)',
      })),
      transition(':enter',[
        animate(300,style({
          transform: 'scale(1.3)',
        }))
      ])
    ])
  ]
})
export class RequestShiftsComponent implements OnInit {

  formShifts : FormGroup;
  subscription:Subscription;
  isPatient:boolean = false;
  isAdmin:boolean = false;
  specialist:Specialist;
  speciality:Specialist;
  specialities:Specialist[] = [];
  specialists:Specialist[] = [];
  patientsName:string[] = [];
  showSpecialities:boolean = false;
  showShifts:boolean = false;
  ShiftAvailable:string;
  selected:boolean = false;
  state:string = 'inactive';
  disponibilities:string[] = [];
  disponibilityFormat:number[] = [];
  specialitiesString:string[] = [];
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

  togleButton(){
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }
  get patientNameControl():any{
    return this.formShifts.get('patientName').value;
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['register']);
  }

  getDisponibilities(){
    this.disponibilities = this.specialists.map(especialist => {
      return especialist.disponibility;
    })
    let splice:string[] = this.disponibilities[0].split('-');
    for (let index = 0; index < 3; index++) {
      let number1:number = parseInt(splice[0],10);
      let number2:number = parseInt(splice[1],10);
      this.disponibilityFormat.push(this.getRandomArbitrary(number1,number2))
      
    }
    
    console.log(this.disponibilityFormat)
  }
  getRandomArbitrary(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  public get Form():any{
    return this.formShifts.controls;
  }

  getSpecialistSelected(specialist:Specialist,e:any):void{
    e.target.className = 'btn btn-danger m-3'
    $(".btn-success").prop('disabled', true);
    this.specialist = specialist;
    this.filterSpecialities()
    this.showSpecialities = true;
  }
  getSpecialitySelected(speciality:Specialist,e:any):void{
    e.target.className = 'btn btn-danger m-3'
    $(".btn-info").prop('disabled', true);
    this.speciality = speciality;
    this.getDisponibilities();
    this.showShifts = true
    
  }
  filterSpecialities(){
    this.specialists = this.specialists.filter(especialist => {
      return especialist.speciality === this.specialist.speciality
    })
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
        let specialist:Specialist = new Specialist(r.id,
          r.data().firstName,
          r.data().lastName,
          r.data().age,
          r.data().dni,
          r.data().email,
          r.data().password,
          r.data().speciality,
          r.data().access,
          r.data().disponibility,
          r.data().photo);
          this.specialists.push(specialist);
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
    console.log(this.selected)
    if(this.isAdmin){
      if(this.selected){
        this.shiftsService.addShift({
          patientName: this.patientNameControl,
          specialist: this.specialist.firstName + ' ' +this.specialist.lastName,
          speciality: this.speciality.speciality,
          date: this.getDateAndTime()[0],
          time: this.getDateAndTime()[1],
          state: 'no realized',
          commentary: '',
          attention: '',
          diagnosis: ''

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
        time: this.getDateAndTime()[1],
        state: 'no realized',
        commentary: '',
        attention: '',
        diagnosis: ''
      }).then(res => {
        console.log(res);
        window.location.reload();
      }).catch(err => {
        console.log(err);    
      });
      
    }
    
  }

}
