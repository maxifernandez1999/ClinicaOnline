import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/Patient';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data:Patient; 
  administrators:any[] = [];
  specialists:any[] = [];
  patients:any[] = [];

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
      this.patients = res;
    });
  }

  getSpecialists():void{
    this.userService.Specialists.subscribe(res => {
      this.specialists = res;
    });
  }

  getAdministrators():void{
    this.userService.Administrators.subscribe(res => {
      this.administrators = res;
    });
  }

  isRegister():boolean{
    for (const pat of this.patients) {
      if (pat.email === this.Email && pat.password === this.Password) {
        return true;
      }
    }
    for (const pat of this.specialists) {
      if (pat.email === this.Email && pat.password === this.Password) {
        return true;
      }
    }
    for (const pat of this.administrators) {
      if (pat.email === this.Email && pat.password === this.Password) {
        return true;
      }
    }
    return false;
  }

  Login():void{
    if (this.isRegister()) {
      this.router.navigate(['admin']);
    }else{
      alert('no registrado');
    }
  }

}
