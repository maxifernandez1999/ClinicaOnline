import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient } from '../models/Patient';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public patients: Observable<any>; //[]
  public specialists: Observable<any>;
  public administrators: Observable<any>;

  private communicatorLoginPatient = new BehaviorSubject<any>('');
  public communicatorLoginPatient$ = this.communicatorLoginPatient.asObservable();
  constructor(private readonly firestore: AngularFirestore,
              private readonly storage:AngularFireStorage) { 
    // this.patients = firestore.collection('patients').valueChanges();
    // this.specialists = firestore.collection('specialists').valueChanges();
    // this.administrators = firestore.collection('administrators').valueChanges();
    this.patients = firestore.collection('patients').get();
    this.specialists = firestore.collection('specialists').get();
    this.administrators = firestore.collection('administrators').get();
  }


  get Patients():any{
    return this.patients;
  }
  get Specialists():any{
    return this.specialists;
  }
  get Administrators():any{
    return this.administrators;
  }

  addPatient(data:any):Promise<any>{
    return this.firestore.collection('patients').add(data);
  }

  addSpecialist(data:any):Promise<any>{
    return this.firestore.collection('specialists').add(data);
  }

  addAdministrator(data:any):Promise<any>{
    return this.firestore.collection('administrators').add(data);
  }

  
  uploadFile(file:File, folder:any, email:any, id:any):void{
    const filePath = `${folder}/${email}_${id}.png`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
  }

  downloadFile():Observable<any>{
    const ref = this.storage.ref('patients/maxi@maxi.com_23456789.png');
    return ref.getDownloadURL();
  }

  UpdateSpecialist(id:string,isAccess:boolean):any{
    return this.firestore.collection("specialists").doc(id).update({access: isAccess});
  }

  UpdateSpecialistProfile(id:string,dispon:string):any{
    return this.firestore.collection("specialists").doc(id).update({disponibility: dispon});
  }

  public dataLoginPatient(data:Patient){
    this.communicatorLoginPatient.next(data);
  }


}
