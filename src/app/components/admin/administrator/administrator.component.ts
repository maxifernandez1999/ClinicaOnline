import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/Patient';
import { Specialist } from 'src/app/models/specialist';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  administrators:Patient[] = [];
  patients:Patient[] = [];
  specialists:Specialist[] = [];
  profileUrl:Observable<any>;
  @ViewChild('check') checkbox:ElementRef;
  constructor(private readonly userService: UsersService) { }

  ngOnInit(): void {
    // this.getAdministrators();
    this.getSpecialists();
    this.getPatients();
    this.downloadFile();
  }

  getAdministrators():void{
    this.userService.Administrators.subscribe(res => {
      res.forEach(r => {
        this.administrators.push(r.data());
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
                                r.data().socialWork);

        this.patients.push(patient);
      });

    });
    console.log(this.patients)
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
                                r.data().speciality);

        this.specialists.push(specialist);
      });
    });
    
    
  }

  downloadFile():void{
    this.userService.downloadFile().subscribe(res => {
      console.log(res);
      this.profileUrl = res;
    });
  }

  isChecked():void{
    const el = this.checkbox.nativeElement.checked;
    console.log(el); 
  }

  UpdateSpecialist():void{
    
  }

}
