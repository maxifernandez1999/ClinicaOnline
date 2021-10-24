import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Administrator } from 'src/app/models/Administrator';
import { Patient } from 'src/app/models/Patient';
import { Specialist } from 'src/app/models/Specialist';
import { ShiftsService } from 'src/app/services/shifts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  administrators:Administrator[] = [];
  specialists:Specialist[] = [];
  patients:Patient[] = [];

  isPatient:boolean = false;
  isSpecialist:boolean = false;
  isAdministrator:boolean = false;


  @ViewChild('email') email:ElementRef;
  @ViewChild('password') password:ElementRef;
  constructor(private userService: UsersService,
              private router:Router,
              private shiftsService: ShiftsService) { }

  ngOnInit(): void {
    this.getAdministrators();
    this.getSpecialists();
    this.getPatients();
  }

  get Email():any{
    return this.email.nativeElement.value;
  }

  get Password():any{
    return this.password.nativeElement.value;
  }

  access():void{
    this.router.navigate(['admin']);
  }

  sendDataLogin(data:string){
    this.shiftsService.dataLogin(data);
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
                                r.data().speciality,
                                r.data().access);

        this.specialists.push(specialist);
      });
    });
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
                                r.data().password);

        this.administrators.push(administrator);
      });
    });
  }

  isRegister():string{
    for (const pat of this.patients) {
      if (this.userValid(pat)) {
        this.isPatient = true;
        return "register";
      }
    }
    for (const spe of this.specialists) {
      if (this.userValid(spe)) {
        if (this.accessValid(spe)) {
          this.isSpecialist = true;
          return "access";
          
        }else{
          return "no-access"
        }
      }
    }
    for (const adm of this.administrators) {
      if (this.userValid(adm)) {
        this.isAdministrator = true;
        return "register";
      }
    }
    return "error";
  }

  userValid(user:any):boolean{
    if (user.email === this.Email && user.password === this.Password) {
      return true;
    }
    return false;
  }

  accessValid(spe:Specialist):boolean{
    return spe.access;
  }

  login():void{
    if (this.isRegister() === "register") {
      if (this.isPatient) {
        this.sendDataLogin("patient");
      }else if(this.isSpecialist){
        this.sendDataLogin("specialist");
      }else{
        this.sendDataLogin("administrator");
      }
      this.router.navigate(['shiftsLoad']);
    }else if(this.isRegister() === "no-access"){
      alert('The specialist does not have access');
    }else{
      alert('no registed');
    }
  }

}
