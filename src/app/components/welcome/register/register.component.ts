import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private renderer:Renderer2,
              private fb: FormBuilder ) {}

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
      ]

      // region: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(3),Validators.pattern('^[0-9]*$')]],
      // phone: ['',[Validators.required,Validators.maxLength(7),Validators.pattern('^[0-9]*$')]]
    });
  }

  get emailPatientControl():AbstractControl{
    return this.form.get('emailPatient');
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
