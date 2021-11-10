import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  estadisticas:Observable<any>;
  private communicatorEstadistica = new BehaviorSubject<string[]>([]);
  public communicatorEstadistica$ = this.communicatorEstadistica.asObservable();
  constructor(private readonly firestore:AngularFirestore) { 
    this.estadisticas = firestore.collection('estadisticas').get();
  }
  get Estadisticas():any{
    return this.estadisticas;
  }

  addEstadistica(data:any):Promise<any>{
    return this.firestore.collection('estadisticas').add(data);
  }
}
