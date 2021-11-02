import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private userService:UsersService,
              private router:Router) { }

  key:string;
  localStorageData:any;
  patient:Patient;
  specialist:Specialist;
  administrator:Administrator;
  @ViewChild('de') de:ElementRef;
  @ViewChild('hasta') hasta:ElementRef;

  profileUrl:string;
  ngOnInit(): void {
    this.getLocalStorageData();
    if (this.key === "patient") {
      this.getPatient();
    }else if(this.key === "specialist"){
      this.getSpecialist();
    }else if(this.key === "administrator"){
      this.getAdministrator();
    }
    
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
            r.data().socialWork,
            r.data().photo);
        }
        

      });

    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['register']);
  }
  getAdministrator():void{
    this.userService.Administrators.subscribe(res => {
      res.forEach(r => {
        if (this.isRegister(r.data().email,r.data().password)) {
          this.administrator = new Administrator(r.id,
            r.data().firstName,
            r.data().lastName,
            r.data().age,
            r.data().dni,
            r.data().email,
            r.data().password,
            r.data().photo);
        }
        

      });
    });
  }

  downloadFile():void{
    if (this.key === 'patient') {
      // this.userService.downloadFile(this.patient.photo).subscribe(res => {
      //   console.log(res);
      //   this.profileUrl = res;
      // });
    }else if(this.key === 'specialist'){
      this.userService.downloadFile(this.specialist.photo).subscribe(res => {
        console.log(res);
        this.profileUrl = res;
      });
    }else if(this.key === 'administrator'){
      this.userService.downloadFile(this.administrator.photo).subscribe(res => {
        console.log(res);
        this.profileUrl = res;
      });
    }
    
  }
  getSpecialist():void{
    this.userService.Specialists.subscribe(res => {
      res.forEach(r => {
        if (this.isRegister(r.data().email,r.data().password)) {
          this.specialist = new Specialist(r.id,
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
        }
        

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
  UpdateSpecialist():void{
    let de = this.de.nativeElement.value;
    let hasta = this.hasta.nativeElement.value; 
    this.userService.UpdateSpecialistProfile(this.specialist.id, de + '-' + hasta);
    window.location.reload();
  }

}
