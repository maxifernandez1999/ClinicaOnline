import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  administrators:any[] = [];
  patients:any[] = [];
  specialists:any[] = [];
  profileUrl:Observable<any>;
  constructor(private readonly userService: UsersService) { }

  ngOnInit(): void {
    this.getAdministrators();
    this.getSpecialists();
    this.getPatients();
    this.downloadFile();
  }

  getAdministrators():void{
    this.userService.Administrators.subscribe(res => {
      this.administrators = res;
    });
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

  downloadFile():void{
    this.userService.downloadFile().subscribe(res => {
      console.log(res);
      this.profileUrl = res;
    });
  }

}
