import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data:User; 
  @ViewChild('email') email:ElementRef;
  @ViewChild('password') password:ElementRef;
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.userService.Patients.subscribe(res => {
      console.log(res);
    });
  }

  addUserPatient():void{
    this.userService.addPatient({
      email: this.email.nativeElement.value,
      pasword: this.password.nativeElement.value
    }).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });
  }

}
