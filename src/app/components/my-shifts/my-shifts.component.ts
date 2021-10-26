import { Component, OnInit } from '@angular/core';
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
              private shiftService: ShiftsService) { }
  
  patient:Patient;
  ID:string;
  shifts: Shift[] = [];
  subscription:Subscription;
  specialists: string[] = [];
  specialities: string[] = [];

  ngOnInit(): void {
    this.getShifts();
    setTimeout(() => {
      this.getSpecialists();
      this.getSpeciality();
    },2000);
  }

  getLocalStorageData():string{
    return localStorage.getItem("patient");
  }

  seeReview(id:string):void{

  }
  survey(id:string):void{

  }
  rateAttention(id:string):void{

  }
  sendID(id:string){
    this.ID = id;
  }
  getReview():void{

  }
  getShifts(): void {
      this.getLocalStorageData();
      this.shiftService.Shifts.subscribe(res => {
        res.forEach(r => {
          let shift: Shift = new Shift( r.id,
                                        r.data().patientName,
                                        r.data().specialist,
                                        r.data().speciality,
                                        r.data().date,
                                        r.data().time);
          this.shifts.push(shift);     
        });
        this.filterShifts();
      })
      
  }
  filterShifts(){
    let obj = JSON.parse(this.getLocalStorageData());
    console.log(obj);
    this.shifts = this.shifts.map<Shift>(shift => {
      if (shift.patientName == obj.firstName) {
        return shift;
      }
      return null;
    })
  }

  resetFilters() {
    window.location.reload();
  }
  getSpeciality(): void {
    this.specialities = this.shifts.map(function (shift) {
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

  getSpecialists(): void {
    this.specialists = this.shifts.map(function (shift) {
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
    this.shifts = this.shifts.filter((shift) => {
      return shift.speciality === shiftParam;
    })
  }

  filterSpecialist(shiftParam: string): void {
    this.shifts = this.shifts.filter(shift => {
      return shift.specialist === shiftParam;
    })
  }

  cancelShift(id: string) {
    this.shiftService.cancelShift(id).then(res => {
      console.log("exitoso")
      window.location.reload();
    }).catch(err => {
      console.log(err);
    })

  }

}
