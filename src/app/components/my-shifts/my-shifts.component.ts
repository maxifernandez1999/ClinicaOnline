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

  shifts: Shift[] = [];
  subscription:Subscription;
  specialists: string[] = [];
  specialities: string[] = [];

  ngOnInit(): void {
    this.getInfoLoginPatient();
    this.getShifts();
  }
  getInfoLoginPatient():void{
    this.subscription = this.userService.communicatorLoginPatient$.subscribe(res => {
      this.patient = res;
    });
    console.log(this.patient.firstName);
  }


  ////////////////////////
  getShifts(): void {
    this.shiftService.Shifts.subscribe(res => {
      res.forEach(r => {
        console.log(r.data().patientName)
        if (r.data().patientName == this.patient.firstName) {
              console.log(r.data().patientName)
              let shift: Shift = new Shift( r.id,
                                            r.data().patientName,
                                            r.data().specialist,
                                            r.data().speciality,
                                            r.data().date,
                                            r.data().time);
              this.shifts.push(shift);     
        }
        
      });
    });
    console.log(this.shifts)
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
