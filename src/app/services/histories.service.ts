import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriesService {
  histories:Observable<any>;
  private communicator = new BehaviorSubject<string[]>([]);
  public communicator$ = this.communicator.asObservable();
  constructor(private readonly firestore:AngularFirestore) { 
    this.histories = firestore.collection('histories').get();
  }
  get Histories():any{
    return this.histories;
  }
  public Communicator(data:string[]){
    this.communicator.next(data);
  }
  cancelHistory(id:string):Promise<any>{
    return this.firestore.collection("histories").doc(id).delete();
  }
  addHistory(data:any):Promise<any>{
    return this.firestore.collection('histories').add(data);
  }
  UpdateHistory(id:string,commentary:string):Promise<any>{
    return this.firestore.collection("histories").doc(id).update({commentary: commentary});
  }
}
