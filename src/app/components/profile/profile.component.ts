import { Component, OnInit } from '@angular/core';
import { Administrator } from 'src/app/models/Administrator';
import { Patient } from 'src/app/models/Patient';
import { Specialist } from 'src/app/models/Specialist';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService:UsersService) { }

  key:string;
  localStorageData:any;
  patient:Patient;
  profileUrl:string;
  ngOnInit(): void {
    this.getLocalStorageData();
    this.getPatient();
  }
  getPatient():void{
    this.userService.Patients.subscribe(res => {
      res.forEach(r => {
        if (this.isRegister(r.data().email,r.data().password)) {
          this.patient = new Patient(r.id,
            r.data().firstName,
            r.data().lastName,
            r.data().age,
            r.data().dni,
            r.data().email,
            r.data().password,
            r.data().socialWork);
        }
        

      });

    });
  }
  getAdministrator():void{
    this.userService.Administrators.subscribe(res => {
      res.forEach(r => {
        let administrator:Administrator = new Administrator(r.id,
                                r.data().firstName,
                                r.data().lastName,
                                r.data().age,
                                r.data().dni,
                                r.data().email,
                                r.data().password);

      });
    });
  }

  downloadFile():void{
    this.userService.downloadFile().subscribe(res => {
      console.log(res);
      this.profileUrl = res;
    });
  }
  getSpecialist():void{
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
                                r.data().access);

      });
    });
    
    
  }

  getLocalStorageData():void{
    if (localStorage.hasOwnProperty("patient")) {
      this.key = "patient";
      this.localStorageData = JSON.parse(localStorage.getItem("patient"));
    }else if(localStorage.hasOwnProperty("specialist")){
      this.key = "specialist";
      this.localStorageData =  JSON.parse(localStorage.getItem("specialist"));
    }else{
      this.key = "administrator";
      this.localStorageData =  JSON.parse(localStorage.getItem("administrator"));
    }
    
  }
  isRegister(email:string, password:string):boolean{
    if(email == this.localStorageData.email && password == this.localStorageData.password){
      return true;
    }
    return false;
  }

}
