import { Component, ElementRef, OnInit, ValueProvider, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Administrator } from 'src/app/models/Administrator';
import { Patient } from 'src/app/models/Patient';
import { Specialist } from 'src/app/models/Specialist';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  administrators:Administrator[] = [];
  patients:Patient[] = [];
  specialists:Specialist[] = [];
  profileUrl:Observable<any>;
  @ViewChild('check') checkbox:ElementRef;
  constructor(private readonly userService: UsersService,
              private router:Router) { }

  ngOnInit(): void {
    this.getAdministrators();
    this.getSpecialists();
    this.getPatients();
    // this.downloadFile();
  }

  getAdministrators():void{
    this.userService.Administrators.subscribe(res => {
      res.forEach(r => {
        let administrator:Administrator = new Administrator(r.id,
                                r.data().firstName,
                                r.data().lastName,
                                r.data().age,
                                r.data().dni,
                                r.data().email,
                                r.data().password,
                                r.data().photo);

        this.administrators.push(administrator);
      });
    });
  }

  getPatients():void{
    this.userService.Patients.subscribe(res => {
      res.forEach(r => {
        let patient:Patient = new Patient(r.id,
                                r.data().firstName,
                                r.data().lastName,
                                r.data().age,
                                r.data().dni,
                                r.data().email,
                                r.data().password,
                                r.data().socialWork,
                                r.data().photo);

        this.patients.push(patient);
      });

    });
    console.log(this.patients)
  }
  ClinicHistories(){
    this.router.navigate(['history']);
  }
  getSpecialists():void{
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

  goShifts():void{
    this.router.navigate(['shifts'])
  }
  goRequestShifts():void{
    this.router.navigate(['shiftsLoad'])
  }
  profile():void{
    this.router.navigate(['profile'])
  }
  

  downloadFile(filePath:string):void{
    this.userService.downloadFile(filePath).subscribe(res => {
      console.log(res);
      this.profileUrl = res;
    });
  }

  isChecked(id:string):void{
    const isChecked = this.checkbox.nativeElement.checked;
    this.UpdateSpecialist(id,isChecked);
  }

  UpdateSpecialist(id:string,check:boolean):void{
    this.userService.UpdateSpecialist(id,check);
  }

}
