import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HistoriesService } from 'src/app/services/histories.service';

@Component({
  selector: 'app-request-clinic-history',
  templateUrl: './request-clinic-history.component.html',
  styleUrls: ['./request-clinic-history.component.scss'],
})
export class RequestClinicHistoryComponent implements OnInit {
  form: FormGroup;
  localStorageData: any;
  patientName:string;
  id:string;
  constructor(
    private fb: FormBuilder,
    private historyService: HistoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDataToShifts();
    this.getLocalStorageData();
    this.initForm();
  }

  public get Form(): any {
    return this.form.controls;
  }
  get Height(): any {
    return this.form.get('height').value;
  }
  get Weight(): any {
    return this.form.get('weight').value;
  }
  get Temperature(): any {
    return this.form.get('temperature').value;
  }
  get Pressure(): any {
    return this.form.get('height').value;
  }
  get BloodType(): any {
    return this.form.get('blood').value;
  }
  initForm(): void {
    this.form = this.fb.group({
      height: [
        '',
        [Validators.required, Validators.min(10), Validators.max(300)],
      ],
      weight: [
        '',
        [Validators.required, Validators.min(10), Validators.max(700)],
      ],
      temperature: [
        '',
        [Validators.required, Validators.min(24), Validators.max(50)],
      ],
      pressure: [
        '',
        [Validators.required, Validators.min(1), Validators.max(25)],
      ],
      blood: ['', Validators.required],
    });
  }

  getLocalStorageData(): void {
    if (localStorage.hasOwnProperty('patient')) {
      this.localStorageData = JSON.parse(localStorage.getItem('patient'));
    } else if (localStorage.hasOwnProperty('specialist')) {
      this.localStorageData = JSON.parse(localStorage.getItem('specialist'));
    } else {
      this.localStorageData = JSON.parse(localStorage.getItem('administrator'));
    }
  }

  getDataToShifts():void{
    this.historyService.communicator$.subscribe(res => {
      this.id = res[0];
      this.patientName = res[1];
    })
  }
  addHistory(): void {
    console.log(this.id)
    this.historyService
      .addHistory({
        idShift: this.id,
        height: this.Height,
        weight: this.Weight,
        temperature: this.Temperature,
        pressure: this.Pressure,
        bloodType: this.BloodType,
        patientName: this.patientName,
        specialistName: this.localStorageData.firstName + ' ' + this.localStorageData.lastName
      })
      .then((res) => {
        console.log(res);
        this.router.navigate(['myShifts'])
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
