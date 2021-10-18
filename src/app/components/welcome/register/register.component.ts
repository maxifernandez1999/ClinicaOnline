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
      firstName: ['',[Validators.required, Validators.maxLength(20)]],
      lastName: ['',[Validators.required, Validators.maxLength(20)]],
      age: ['',[Validators.required, Validators.min(18), Validators.max(99)]]
      // region: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(3),Validators.pattern('^[0-9]*$')]],
      // phone: ['',[Validators.required,Validators.maxLength(7),Validators.pattern('^[0-9]*$')]]
    });
  }

  get companyNameControl():AbstractControl{
    return this.form.get('companyName');
  }

  get regionControl():AbstractControl{
    return this.form.get('region');
  }

  get phoneControl():AbstractControl{
    return this.form.get('phone');
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
