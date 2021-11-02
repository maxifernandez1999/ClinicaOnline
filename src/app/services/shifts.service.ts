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
  // .snapshotChanges() returns a DocumentChangeAction[], which contains
  // a lot of information about "what happened" with each change. If you want to
  // get the data and the id use the map operator.
  
  get ShiftCollection():any{
    return this.firestore.collection<Shift>('shifts');
  }


 

  cancelShift(id:string):Promise<any>{
    return this.firestore.collection("shifts").doc(id).delete();
  }
  addShift(data:any):Promise<any>{
    return this.firestore.collection('shifts').add(data);
  }
  UpdateShiftCommentary(id:string,commentary:string):Promise<any>{
    return this.firestore.collection("shifts").doc(id).update({commentary: commentary});
  }
  UpdateShiftState(id:string,state:string):Promise<any>{
    return this.firestore.collection("shifts").doc(id).update({state: state});
  }
  UpdateShiftAttention(id:string,attention:string):Promise<any>{
    return this.firestore.collection("shifts").doc(id).update({attention: attention});
  }
}
