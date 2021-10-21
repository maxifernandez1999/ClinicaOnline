import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public patients: Observable<any[]>;
  public specialists: Observable<any[]>;
  public administrators: Observable<any[]>;


  constructor(private readonly firestore: AngularFirestore,
              private readonly storage:AngularFireStorage) { 
    this.patients = firestore.collection('patients').valueChanges();
    this.specialists = firestore.collection('specialists').valueChanges();
    this.administrators = firestore.collection('administrators').valueChanges();
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

  
  uploadFile(file:File, folder:any, email:any, dni:any):void{
    // const id = Math.random().toString(36).substring(2);
    const filePath = `${folder}/${email}_${dni}.png`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
  }

  downloadFile():Observable<any>{
    const ref = this.storage.ref('patients/maxi@maxi.com_23456789.png');
    return ref.getDownloadURL();
  }


}