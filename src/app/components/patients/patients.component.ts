import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClinicHistory } from 'src/app/models/ClinicHistory';
import { HistoriesService } from 'src/app/services/histories.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  subscription:Subscription;
  histories:ClinicHistory[] = [];
  localStorageData:any;
  key:string;
  historiesFilter:ClinicHistory[] = [];
  constructor(private historyService: HistoriesService) { }

  ngOnInit(): void {
    this.getSHistories();
    this.getLocalStorageData();
    setTimeout(() => {
      this.filterHistories();
    }, 2000);
  }

  getSHistories(): void {
    this.subscription = this.historyService.Histories.subscribe((res) => {
      res.forEach((r) => {
        let clinicHistory: ClinicHistory = new ClinicHistory(
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
        this.histories.push(clinicHistory);
      });
    });
  }

  getLocalStorageData(): void {
    if (localStorage.hasOwnProperty('patient')) {
      this.localStorageData = JSON.parse(localStorage.getItem('patient'));
      this.key = "patient";
    } else if (localStorage.hasOwnProperty('specialist')) {
      this.localStorageData = JSON.parse(localStorage.getItem('specialist'));
      this.key = "specialist";
    } else {
      this.localStorageData = JSON.parse(localStorage.getItem('administrator'));
      this.key = "administrator";
    }
  }

  filterHistories() {
    if (this.key === 'patient') {
      this.histories = this.histories.map<ClinicHistory>((history) => {
        console.log(this.localStorageData.firstName)
        console.log(history.patientName)
        if (history.patientName == this.localStorageData.firstName) {
          this.historiesFilter.push(history);
          return history;
        }
        return history;
      });
      console.log(this.historiesFilter)
    } else if (this.key === 'specialist') {
      this.histories = this.histories.map<ClinicHistory>((history) => {
        if (history.specialistName == this.localStorageData.firstName + ' ' + this.localStorageData.lastName) {
          this.historiesFilter.push(history);
          return history;
        }
        return history;
      });
    }
  }

}
