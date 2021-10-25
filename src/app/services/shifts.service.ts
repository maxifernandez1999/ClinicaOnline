import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

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

  addShift(data:any):Promise<any>{
    return this.firestore.collection('shifts').add(data);
  }
}
