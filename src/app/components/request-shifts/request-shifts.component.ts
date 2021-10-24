import { Component, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { ShiftsService } from 'src/app/services/shifts.service';

@Component({
  selector: 'app-request-shifts',
  templateUrl: './request-shifts.component.html',
  styleUrls: ['./request-shifts.component.scss']
})
export class RequestShiftsComponent implements OnInit {

  subscription:Subscription;
  isPatient:boolean = false;
  isAdmin:boolean = false;
  constructor(private readonly shiftsService: ShiftsService) { }


  ngOnInit(): void {
    this.getInfoLogin();
    console.log(this.isAdmin);
  }

  getInfoLogin():void{
    this.subscription = this.shiftsService.communicatorLogin$.subscribe(res => {
      if(res === "patient"){
        this.isPatient = true;
      }else if(res === "administrator"){
        this.isAdmin = true;
      }else{
        console.log("specialist")
      }
    });
  }

}
