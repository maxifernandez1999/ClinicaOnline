import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClinicHistory } from 'src/app/models/ClinicHistory';
import { Patient } from 'src/app/models/Patient';
import { Shift } from 'src/app/models/Shift';
import { HistoriesService } from 'src/app/services/histories.service';
import { ShiftsService } from 'src/app/services/shifts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-shifts',
  templateUrl: './my-shifts.component.html',
  styleUrls: ['./my-shifts.component.scss'],
})
export class MyShiftsComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private shiftService: ShiftsService,
    private router: Router,
    private historyService: HistoriesService
  ) {}
  name: string;
  patient: Patient;
  ID: string;
  key: string;
  historiesFields: any[] = [];
  shiftsFilter: Shift[] = [];
  shifts: Shift[] = [];
  histories: ClinicHistory[] = [];
  subscription: Subscription;
  specialists: string[] = [];
  specialities: string[] = [];
  states: string[] = [];
  dates: string[] = [];
  patients: string[] = [];
  review: string;
  finishTurnEl: string;
  patientName: string;

  localStorageData: string;

  @ViewChild('texarea') tex: ElementRef;
  @ViewChild('texareaFinish') texf: ElementRef;
  @ViewChild('att') att: ElementRef;
  ngOnInit(): void {
    this.getLocalStorageData();
    this.getUserName();
    this.getShifts();
    this.getHistories();

    setTimeout(() => {
      this.filterShifts();
      if (this.key === 'patient') {
        this.getSpecialists();
        this.getSpeciality();
        this.getDates();
        this.getStates();
      } else if (this.key === 'specialist') {
        this.getSpeciality();
        this.getPatient();
        this.getDates();
        this.getStates();
      }
    }, 2000);
  }

  patientsFunction(): void {
    this.router.navigate(['patients']);
  }
  getLocalStorageData(): void {
    if (localStorage.hasOwnProperty('patient')) {
      this.key = 'patient';
      this.localStorageData = localStorage.getItem('patient');
    } else if (localStorage.hasOwnProperty('specialist')) {
      this.key = 'specialist';
      this.localStorageData = localStorage.getItem('specialist');
    }
  }

  goRequestShifts(): void {
    this.router.navigate(['shiftsLoad']);
  }
  profile(): void {
    this.router.navigate(['profile']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['register']);
  }
  getUserName(): void {
    let obj = JSON.parse(this.localStorageData);
    console.log(obj);
    this.name = obj.firstName;
    console.log(this.name);
  }

  seeReview(commentary: string): void {}
  survey(id: string): void {}
  rateAttentionID(id: string): void {
    this.ID = id;
  }
  rateAttention(): void {
    this.shiftService
      .UpdateShiftAttention(this.ID, this.att.nativeElement.value)
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  }
  sendID(id: string) {
    this.ID = id;
  }
  getReview(): void {
    this.review = this.tex.nativeElement.value;
    this.cancelShiftnew();
  }

  getFinishTurn(): void {
    this.finishTurnEl = this.texf.nativeElement.value;
  }
  refuseTurn(id: string): void {}
  acceptTurn(id: string): void {}

  finishTurn(): void {
    this.getFinishTurn();
    this.shiftService.UpdateShiftState(this.ID, 'realized').then(() => {
      this.shiftService
        .UpdateShiftdiagnosis(this.ID, this.finishTurnEl)
        .then(() => {
          this.historyService.Communicator([this.ID, this.patientName]);
          this.router.navigate(['request-history']);
        });
    });
  }
  finishTurnID(id: string, patientName: string): void {
    this.ID = id;
    this.patientName = patientName;
  }

  getShifts(): void {
    this.subscription = this.shiftService.Shifts.subscribe((res) => {
      res.forEach((r) => {
        let shift: Shift = new Shift(
          r.id,
          r.data().patientName,
          r.data().specialist,
          r.data().speciality,
          r.data().date,
          r.data().time,
          r.data().state,
          r.data().commentary,
          r.data().attention,
          r.data().diagnosis
        );
        this.shifts.push(shift);
      });
    });
  }
  getHistories(): void {
    this.subscription = this.historyService.Histories.subscribe((res) => {
      res.forEach((r) => {
        if (r.data().patientName === this.name) {
          let history: ClinicHistory = new ClinicHistory(
            r.id,
            r.data().height,
            r.data().weight,
            r.data().temperature,
            r.data().pressure,
            r.data().bloodType,
            r.data().patientName,
            r.data().specialistName,
            r.data().idShift
          );
          this.histories.push(history);
        }
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filterShifts() {
    let obj = JSON.parse(this.localStorageData);
    if (this.key === 'patient') {
      this.shifts = this.shifts.map<Shift>((shift) => {
        if (shift.patientName == obj.firstName) {
          this.shiftsFilter.push(shift);
          return shift;
        }
        return shift;
      });
    } else if (this.key === 'specialist') {
      this.shifts = this.shifts.map<Shift>((shift) => {
        if (shift.specialist == obj.firstName + ' ' + obj.lastName) {
          this.shiftsFilter.push(shift);
          return shift;
        }
        return shift;
      });
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
    }, []);

    console.log(this.specialities);
  }
  getPatient() {
    this.patients = this.shiftsFilter.map(function (shift) {
      return shift.patientName;
    });

    this.patients = this.patients.reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);

    console.log(this.patients);
  }

  getSpecialists(): void {
    console.log(this.shifts);
    this.specialists = this.shiftsFilter.map(function (shift) {
      console.log(shift.specialist);
      return shift.specialist;
    });

    this.specialists = this.specialists.reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);

    console.log(this.specialists);
  }
  //
  getDates(): void {
    this.dates = this.shiftsFilter.map(function (shift) {
      return shift.date + ' ' + shift.time;
    });

    this.dates = this.dates.reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);
  }
  filterDates(shiftParam: string): void {
    console.log(this.shiftsFilter);
    this.shiftsFilter = this.shiftsFilter.filter((shift) => {
      if (shift.date + ' ' + shift.time === shiftParam) {
        return true;
      } else {
        return false;
      }
    });
    console.log(this.shiftsFilter);
  }
  //
  getStates(): void {
    this.states = this.shiftsFilter.map(function (shift) {
      return shift.state;
    });

    this.states = this.states.reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);
  }

  //
  // getHistoriesHeight(): void {
  //   this.historiesFields = this.histories.map(function (history) {
  //     if(history.patientName === this.name){
  //       return history.height;
  //     }else{
  //       return 0;
  //     }

  //   });

  //   this.historiesFields = this.historiesFields.reduce((acc, item) => {
  //     if (!acc.includes(item)) {
  //       acc.push(item);
  //     }
  //     return acc;
  //   }, []);
  // }
  filterStates(shiftParam: string): void {
    this.shiftsFilter = this.shiftsFilter.filter((shift) => {
      if (shift.state === shiftParam) {
        return true;
      } else {
        return false;
      }
    });
    console.log(this.shiftsFilter);
  }
  //
  filterHeight(shiftParam: string): void {
    this.shiftsFilter = this.shiftsFilter.filter((shift) => {
      this.histories.forEach((history) => {
        if (shift.id === history.id) {
          return true;
        } else {
          return false;
        }
      });
    });
  }
  filterWeight(shiftParam: string): void {
    this.shiftsFilter = this.shiftsFilter.filter((shift) => {
      this.histories.forEach((history) => {
        if (shift.id === history.id) {
          return true;
        } else {
          return false;
        }
      });
    });
  }
  filterTemperature(shiftParam: string): void {
    this.shiftsFilter = this.shiftsFilter.filter((shift) => {
      this.histories.forEach((history) => {
        console.log(shift.id);
        console.log(history.id);
        if (shift.id === history.id) {
          return true;
        } else {
          return false;
        }
      });
    });
  }
  filterPressure(shiftParam: string): void {
    this.shiftsFilter = this.shiftsFilter.filter((shift) => {
      this.histories.forEach((history) => {
        console.log(shift.id);
        console.log(history.id);
        if (shift.id === history.id) {
          return true;
        } else {
          return false;
        }
      });
    });
  }
  filterBloodType(shiftParam: string): void {
    this.shiftsFilter = this.shiftsFilter.filter((shift) => {
      this.histories.forEach((history) => {
        console.log(shift.id);
        console.log(history.id);
        if (shift.id === history.id) {
          return true;
        } else {
          return false;
        }
      });
    });
  }
  //
  filterSpeciality(shiftParam: string): void {
    console.log(this.shiftsFilter);
    this.shiftsFilter = this.shiftsFilter.filter((shift) => {
      if (shift.speciality === shiftParam) {
        return true;
      } else {
        return false;
      }
    });
    console.log(this.shiftsFilter);
  }

  filterPatient(shiftParam: string): void {
    console.log(this.shiftsFilter);
    this.shiftsFilter = this.shiftsFilter.filter((shift) => {
      if (shift.patientName === shiftParam) {
        return true;
      } else {
        return false;
      }
    });
    console.log(this.shiftsFilter);
  }
  filterSpecialist(shiftParam: string): void {
    console.log(this.shiftsFilter);
    this.shiftsFilter = this.shiftsFilter.filter((shift) => {
      if (shift.specialist === shiftParam) {
        return true;
      } else {
        return false;
      }
    });
    console.log(this.shiftsFilter);
  }

  cancelShift(id: string): void {
    this.ID = id;
  }
  cancelShiftnew() {
    this.shiftService
      .UpdateShiftCommentary(this.ID, this.review)
      .then((res) => {
        this.shiftService.UpdateShiftState(this.ID, 'cancel').then((res) => {
          console.log(res);
          window.location.reload();
        });
      });
    // this.shiftService.cancelShift(this.ID).then(res => {
    //   console.log("exitoso")
    //   window.location.reload();
    // }).catch(err => {
    //   console.log(err);
    // })
  }
}
