import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Administrator } from 'src/app/models/administrator';
import { Patient } from 'src/app/models/Patient';
import { Specialist } from 'src/app/models/Specialist';
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

  @ViewChild('email') email:ElementRef;
  @ViewChild('password') password:ElementRef;
  constructor(private userService: UsersService,
              private router:Router) { }

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
        return "register";
      }
    }
    for (const spe of this.specialists) {
      if (this.userValid(spe)) {
        if (this.accessValid(spe)) {
          return "access";
        }else{
          return "no-access"
        }
      }
    }
    for (const adm of this.administrators) {
      if (this.userValid(adm)) {
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
      this.router.navigate(['admin']);
    }else if(this.isRegister() === "no-access"){
      alert('The specialist does not have access');
    }else{
      alert('no registed');
    }
  }

}
