import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/models/Patient';
import { Shift } from 'src/app/models/Shift';
import { ShiftsService } from 'src/app/services/shifts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-shifts',
  templateUrl: './my-shifts.component.html',
  styleUrls: ['./my-shifts.component.scss']
})
export class MyShiftsComponent implements OnInit {

  constructor(private userService: UsersService,
              private shiftService: ShiftsService,
              private router:Router) { }
  name:string;
  patient:Patient;
  ID:string;
  key:string;
  shiftsFilter:Shift[] = [];
  shifts: Shift[] = [];
  subscription:Subscription;
  specialists: string[] = [];
  specialities: string[] = [];
  patients:string[] = [];
  review:string;

  localStorageData:string;

  @ViewChild('texarea') tex:ElementRef;
  @ViewChild('att') att:ElementRef;
  ngOnInit(): void {
    this.getShifts();
    this.getLocalStorageData();
    this.getUserName();
    
    setTimeout(() => {
      this.filterShifts();
      if (this.key === "patient") {
        console.log(this.shiftsFilter)
        this.getSpecialists();
        this.getSpeciality();
      }else if(this.key === "specialist"){
        this.getSpeciality();
        this.getPatient();
      }
      
    },2000);
  }

  getLocalStorageData():void{
    if (localStorage.hasOwnProperty("patient")) {
      this.key = "patient";
      this.localStorageData = localStorage.getItem("patient");
      
    }else if(localStorage.hasOwnProperty("specialist")){
      this.key = "specialist";
      this.localStorageData =  localStorage.getItem("specialist");
    }
    
  }

  goRequestShifts():void{
    this.router.navigate(['shiftsLoad']);
  }
  profile():void{
    this.router.navigate(['profile']);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['register']);
  }
  getUserName():void{
    let obj = JSON.parse(this.localStorageData);
    console.log(obj);
    this.name = obj.firstName;
  }

  seeReview(commentary:string):void{

  }
  survey(id:string):void{

  }
  rateAttentionID(id:string):void{
    this.ID = id;
  }
  rateAttention():void{
    this.shiftService.UpdateShiftAttention(this.ID,this.att.nativeElement.value).then(res => {
      console.log(res);
      window.location.reload();
    })
  }
  sendID(id:string){
    this.ID = id;
  }
  getReview():void{
    this.review = this.tex.nativeElement.value;
    this.cancelShiftnew();
  }
  refuseTurn(id:string):void{

  }
  acceptTurn(id:string):void{

  }
  finishTurn(id:string):void{

  }
  getShifts(): void {
      this.subscription = this.shiftService.Shifts.subscribe(res => {
        res.forEach(r => {
          let shift: Shift = new Shift( r.id,
                                        r.data().patientName,
                                        r.data().specialist,
                                        r.data().speciality,
                                        r.data().date,
                                        r.data().time,
                                        r.data().state,
                                        r.data().commentary,
                                        r.data().attention);
          this.shifts.push(shift);     
        });
        
      })
      
      
  }
  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }
  
  filterShifts(){
    let obj = JSON.parse(this.localStorageData);
    if (this.key === "patient") {
      this.shifts = this.shifts.map<Shift>(shift => {
        if (shift.patientName == obj.firstName) {
          this.shiftsFilter.push(shift);
          return shift;
        }
        return shift;
      })
    }else if(this.key === "specialist"){
      this.shifts = this.shifts.map<Shift>(shift => {
        if (shift.specialist == obj.firstName + ' ' + obj.lastName) {
          this.shiftsFilter.push(shift);
          return shift;
        }
        return shift;
      })
    }
    
  }

  resetFilters() {
    window.location.reload();
  }
  getSpeciality(): void {
    this.specialities = this.shiftsFilter.map(function (shift) {
        return shift.speciality;
    });

    this.specialities = this.specialities.reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, [])

    console.log(this.specialities);
  }
  getPatient(){
    this.patients = this.shiftsFilter.map(function (shift) {
      return shift.patientName;
    });

    this.patients = this.patients.reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, [])

    console.log(this.patients);
  }

  getSpecialists(): void {
    console.log(this.shifts);
    this.specialists = this.shiftsFilter.map(function (shift) {
      console.log(shift.specialist)
      return shift.specialist;
    });

    this.specialists = this.specialists.reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, [])

    console.log(this.specialists)
  }

  filterSpeciality(shiftParam: string): void {
    this.shifts = this.shiftsFilter.filter((shift) => {
      return shift.speciality === shiftParam;
    })
  }

  filterPatient(shiftParam: string): void {
    this.shifts = this.shiftsFilter.filter((shift) => {
      return shift.patientName === shiftParam;
    })
  }

  filterSpecialist(shiftParam: string): void {
    this.shifts = this.shiftsFilter.filter(shift => {
      return shift.specialist === shiftParam;
    })
  }

  cancelShift(id:string):void{
    this.ID = id;
  }
  cancelShiftnew() {
    this.shiftService.UpdateShiftCommentary(this.ID,this.review).then(res => {
      this.shiftService.UpdateShiftState(this.ID,'cancel').then(res => {
        console.log(res);
        window.location.reload();
      })
    })
    // this.shiftService.cancelShift(this.ID).then(res => {
    //   console.log("exitoso")
    //   window.location.reload();
    // }).catch(err => {
    //   console.log(err);
    // })

  }

}
