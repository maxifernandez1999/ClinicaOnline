import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient } from '../models/Patient';
import { Shift } from '../models/Shift';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {

  shifts:Observable<any>;
  private communicatorLogin = new BehaviorSubject<string>("");
  public communicatorLogin$ = this.communicatorLogin.asObservable();



  constructor(private readonly firestore:AngularFirestore) { 
    this.shifts = firestore.collection('shifts').get();
  }
  get Shifts():any{
    return this.shifts;
  }

  public dataLogin(data:string){
    this.communicatorLogin.next(data);
  }


 

  cancelShift(id:string):Promise<any>{
    return this.firestore.collection("shifts").doc(id).delete();
  }
  addShift(data:any):Promise<any>{
    return this.firestore.collection('shifts').add(data);
  }
}
