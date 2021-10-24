import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {

  private communicatorLogin = new BehaviorSubject<string>("");
  public communicatorLogin$ = this.communicatorLogin.asObservable();

  constructor(private readonly firestore:AngularFirestore) { }

  public dataLogin(data:string){
    this.communicatorLogin.next(data);
  }
}
