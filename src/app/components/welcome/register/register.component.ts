import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form : FormGroup;
  filesPatient:any[] = [];
  filesSpecialist:any[] = [];
  constructor(private renderer:Renderer2,
              private fb: FormBuilder,
              private userService:UsersService ) {}

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

      // region: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(3),Validators.pattern('^[0-9]*$')]],
      // phone: ['',[Validators.required,Validators.maxLength(7),Validators.pattern('^[0-9]*$')]]
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
    console.log(e);;
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

  UploadFile(folder:string,files:any):void{
    for (const file of files) {
      this.userService.uploadFile(file,folder,this.emailPatientControl,this.dniPatientControl);
      
    }
  }

  addPatient(){
    this.userService.addPatient({
      firstName: this.firstNamePatientControl,
      lastName: this.lastNamePatientControl,
      age: this.agePatientControl,
      dni: this.dniPatientControl,
      email: this.emailPatientControl,
      password: this.passwordPatientControl,
      socialWork: this.socialWorkPatientControl
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);    
    });
    this.UploadFile('patients',this.filesPatient);
  }

  addSpecialist(){
    this.userService.addSpecialist({
      firstName: this.firstNameSpecialistControl,
      lastName: this.lastNameSpecialistControl,
      age: this.ageSpecialistControl,
      dni: this.dniSpecialistControl,
      email: this.emailSpecialistControl,
      password: this.passwordSpecialistControl,
      speciality: this.specialityControl
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);    
    })
    this.UploadFile('specialists',this.filesSpecialist);
    console.log(this.specialityControl);
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
