import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

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
  
  constructor(private renderer:Renderer2 ) {}

  ngOnInit(): void {
    
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
