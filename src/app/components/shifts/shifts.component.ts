import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Shift } from 'src/app/models/Shift';
import { ShiftsService } from 'src/app/services/shifts.service';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {

  constructor(private shiftsService:ShiftsService,
              private renderer:Renderer2) { }

  @ViewChild("body") body:ElementRef;
  shifts:Shift[] = [];
  specialists:string[] = [];
  specialities:string[] = [];

  ngOnInit(): void {
    this.getShifts();
    setTimeout(() => {
      this.getSpecialists();
      this.getSpeciality();
    },1500);
  }

  getShifts():void{
    this.shiftsService.Shifts.subscribe(res => {
      res.forEach(r => {
        
        let shift:Shift = new Shift(r.id,
                                    r.data().patientName,
                                    r.data().specialist,
                                    r.data().speciality,
                                    r.data().date,
                                    r.data().time);
        console.log(shift);
        this.shifts.push(shift);
      });
    });
  }

  resetFilters(){
    window.location.reload();
  }
  getSpeciality():void{
    this.specialities = this.shifts.map(function(shift) {
      return shift.speciality;
    });

    this.specialities = this.specialities.reduce((acc,item)=>{
      if(!acc.includes(item)){
      	acc.push(item);
      }
      return acc;
    },[])

    console.log(this.specialities);
  }
  
  getSpecialists():void{
    this.specialists = this.shifts.map(function(shift) {
      return shift.specialist;
    });

    this.specialists = this.specialists.reduce((acc,item)=>{
      if(!acc.includes(item)){
      	acc.push(item);
      }
      return acc;
    },[])

    console.log(this.specialists)
  }

  filterSpeciality(shiftParam:string):void{
    this.shifts = this.shifts.filter((shift) => {
      return shift.speciality === shiftParam;
    })
  }

  filterSpecialist(shiftParam:string):void{
    this.shifts = this.shifts.filter(shift => {
      return shift.specialist === shiftParam;
    })
  }

  cancelShift(id:string){
    this.shiftsService.cancelShift(id).then(res => {
      console.log("exitoso")
      window.location.reload();
    }).catch(err => {
      console.log(err);
    })
    
  }

}
