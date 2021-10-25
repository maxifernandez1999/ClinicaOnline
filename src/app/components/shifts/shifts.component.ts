import { Component, OnInit } from '@angular/core';
import { Shift } from 'src/app/models/Shift';
import { ShiftsService } from 'src/app/services/shifts.service';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {

  constructor(private shiftsService:ShiftsService) { }

  shifts:Shift[];
  ngOnInit(): void {
    this.getShifts();
  }

  getShifts():void{
    this.shiftsService.Shifts.subscribe(res => {
      res.forEach(r => {
        let shift:Shift = new Shift(r.id,
                                r.data().patientName,
                                r.data().speciality,
                                r.data().specialist,
                                r.data().date,
                                r.data().time);

        this.shifts.push(shift);
      });
    });
  }

}
