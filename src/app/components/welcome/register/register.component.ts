import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @ViewChild('linkPatients') linkPatients:ElementRef;
  @ViewChild('linkSpecialists') linkSpecialists:ElementRef;
  @ViewChild('formSpecialists') formSpecialists:ElementRef;
  @ViewChild('formPatients') formPatients:ElementRef;
  @ViewChild('modal') modalRegister:ElementRef;
  form : FormGroup;
  filesPatient:any[] = [];
  filesSpecialist:any[] = [];
  id:string;
  filePath:string;
  constructor(private renderer:Renderer2,
              private fb: FormBuilder,
              private userService:UsersService,
              private router:Router ) {}

  ngOnInit(): void {
    this.initForm();
    
  }

  initForm():void{
    this.form = this.fb.group({
      firstNamePatient: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      lastNamePatient: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      agePatient: [
        '',
        [
          Validators.required,
          Validators.max(99)
        ]
      ],
      dniPatient: [
        '',
        [
          Validators.required,
          Validators.min(10000000),
          Validators.max(99000000)
        ]
      ],
      emailPatient: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      passwordPatient: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      socialWork: [
        '',
        [
          Validators.required,
          Validators.maxLength(30)
        ]
      ],
      firstNameSpecialist: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      lastNameSpecialist: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      ageSpecialist: [
        '',
        [
          Validators.required,
          Validators.max(99)
        ]
      ],
      dniSpecialist: [
        '',
        [
          Validators.required,
          Validators.min(10000000),
          Validators.max(99000000)
        ]
      ],
      emailSpecialist: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      passwordSpecialist: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      speciality:[
        '',
        [
          Validators.required
        ]
      ]

    });
  }

  ///patients
  get agePatientControl():AbstractControl{
    return this.form.get('agePatient').value;
  }
  get firstNamePatientControl():AbstractControl{
    return this.form.get('firstNamePatient').value;
  }
  get lastNamePatientControl():AbstractControl{
    return this.form.get('lastNamePatient').value;
  }
  get emailPatientControl():AbstractControl{
    return this.form.get('emailPatient').value;
  }
  get dniPatientControl():AbstractControl{
    return this.form.get('dniPatient').value;
  }
  get passwordPatientControl():AbstractControl{
    return this.form.get('passwordPatient').value;
  }
  get socialWorkPatientControl():AbstractControl{
    return this.form.get('socialWork').value;
  }
  ///specialists

  get ageSpecialistControl():AbstractControl{
    return this.form.get('ageSpecialist').value;
  }
  get firstNameSpecialistControl():AbstractControl{
    return this.form.get('firstNameSpecialist').value;
  }
  get lastNameSpecialistControl():AbstractControl{
    return this.form.get('lastNameSpecialist').value;
  }
  get emailSpecialistControl():AbstractControl{
    return this.form.get('emailSpecialist').value;
  }
  get dniSpecialistControl():AbstractControl{
    return this.form.get('dniSpecialist').value;
  }
  get passwordSpecialistControl():AbstractControl{
    return this.form.get('passwordSpecialist').value;
  }
  get specialityControl():AbstractControl{
    return this.form.get('speciality').value;
  }



  public get Form():any{
    return this.form.controls;
  }

  get LinkPatients():any{
    return this.linkPatients.nativeElement;
  }

  get LinkSpecialists():any{
    return this.linkSpecialists.nativeElement;
  }

  get FormPatients():any{
    return this.formPatients.nativeElement;
  }

  get FormSpecialists():any{
    return this.formSpecialists.nativeElement;
  }

  ngAfterViewInit():void{
    console.log(this.LinkPatients);
  }

  getFilePatient(e:any):any{
    console.log(e);
    for (const file of e.target.files) {
      this.filesPatient.push(file);
    }
    
    console.log(this.filesPatient);
  }

  getFileSpecialist(e:any):any{
    console.log(e);;
    for (const file of e.target.files) {
      this.filesSpecialist.push(file);
    }
    
    console.log(this.filesSpecialist);
  }

  UploadFile(folder:string,files:any,email:any,firstName:any):void{
    for (const file of files) {
      this.userService.uploadFile(file,folder,email,firstName);
      const filePathReference = `${folder}/${email}_${firstName}.png`;
      this.userService.downloadFile(filePathReference).subscribe(res => {
        console.log(res);
        this.filePath = res;
      });
    }
  }
  getIDPatient():void{
    this.userService.Patients.subscribe(res => {
      res.forEach(r => {
        if (r.data().email === this.emailPatientControl && 
            r.data().password === this.passwordPatientControl) {
            this.id = r.id;
        }
      });
    });

  }
  getIDSpecialist():void{
    this.userService.Specialists.subscribe(res => {
      res.forEach(r => {
        if (r.data().email === this.emailSpecialistControl && 
            r.data().password === this.passwordSpecialistControl) {
            this.id = r.id;
        }
      });
    });

  }

  showModal():void{
    const el = this.modalRegister.nativeElement;
    this.renderer.addClass(el,'show');
  }
  addPatient(){
    this.UploadFile('patients',this.filesPatient,this.emailPatientControl,this.firstNamePatientControl);
    setTimeout(()=>{
      this.userService.addPatient({
        firstName: this.firstNamePatientControl,
        lastName: this.lastNamePatientControl,
        age: this.agePatientControl,
        dni: this.dniPatientControl,
        email: this.emailPatientControl,
        password: this.passwordPatientControl,
        socialWork: this.socialWorkPatientControl,
        photo: this.filePath
  
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);    
      });
      
      setTimeout(()=>{
        this.showModal();
      },1000);
      let obj = {
        firstName: this.firstNamePatientControl,
        lastName: this.lastNamePatientControl,
        age: this.agePatientControl,
        dni: this.dniPatientControl,
        email: this.emailPatientControl,
        password: this.passwordPatientControl,
        socialWork: this.socialWorkPatientControl,
        photo: this.filePath
      }
      localStorage.setItem("patient", JSON.stringify(obj));
      this.router.navigate(['myShifts']);
    },1500)
    
  }

  addSpecialist(){
     this.UploadFile('specialist',this.filesSpecialist,this.emailSpecialistControl,this.firstNameSpecialistControl);
      this.userService.addSpecialist({
      firstName: this.firstNameSpecialistControl,
      lastName: this.lastNameSpecialistControl,
      age: this.ageSpecialistControl,
      dni: this.dniSpecialistControl,
      email: this.emailSpecialistControl,
      password: this.passwordSpecialistControl,
      speciality: this.specialityControl,
      access: false,
      photo: this.filePath
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);    
    })
   
    setTimeout(()=>{
      this.showModal();
    },1000);
    let obj = {
      firstName: this.firstNameSpecialistControl,
      lastName: this.lastNameSpecialistControl,
      age: this.ageSpecialistControl,
      dni: this.dniSpecialistControl,
      email: this.emailSpecialistControl,
      password: this.passwordSpecialistControl,
      speciality: this.specialityControl,
      access: false,
      photo: this.filePath
    }
    localStorage.setItem("specialist", JSON.stringify(obj));
    this.router.navigate(['myShifts']);

    
  }

  changeFormPatients():void{
    this.renderer.addClass(this.LinkPatients,"active");
    this.renderer.removeClass(this.LinkSpecialists,"active");
    this.renderer.addClass(this.FormPatients,"active");
    this.renderer.removeClass(this.FormSpecialists,"active");
  }

  changeFormSpecialists():void{
    this.renderer.addClass(this.LinkSpecialists,"active");
    this.renderer.removeClass(this.LinkPatients,"active");
    this.renderer.addClass(this.FormSpecialists,"active");
    this.renderer.removeClass(this.FormPatients,"active");
  }

}
