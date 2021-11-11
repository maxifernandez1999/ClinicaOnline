import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Administrator } from 'src/app/models/Administrator';
import { Patient } from 'src/app/models/Patient';
import { Specialist } from 'src/app/models/Specialist';
import { EstadisticasService } from 'src/app/services/estadisticas.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @ViewChild('linkPatients') linkPatients: ElementRef;
  @ViewChild('linkSpecialists') linkSpecialists: ElementRef;
  @ViewChild('formSpecialists') formSpecialists: ElementRef;
  @ViewChild('formPatients') formPatients: ElementRef;
  @ViewChild('modal') modalRegister: ElementRef;
  specialists:Specialist[] = [];
  patients:Patient[] = [];
  administrators:Administrator[] = [];
  form: FormGroup;
  filesPatient: any[] = [];
  filesSpecialist: any[] = [];
  id: string;
  filePath: string;
  filePathReference: any;
  siteKey: string;
  currentUser:any = "";
  isPatient:boolean = false;
  isSpecialist:boolean = false;
  isAdministrator:boolean = false;

  email:string;
  password:string;
  constructor(private renderer: Renderer2,
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private estadisticaService:EstadisticasService) {
    this.siteKey = "6LcMtAcdAAAAAAgU0GIxs-ft9CwDIWApsINlvemG"
  }

  ngOnInit(): void {
    this.initForm();
    this.getAdministrators();
    this.getSpecialists();
    this.getPatients();

  }

  get Email():any{
    return this.email;
  }

  get Password():any{
    return this.password;
  }

  set Email(email:string){
    this.email = email;
  }

  set Password(password:string){
    this.password = password;
  }
  initForm(): void {
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
      ageSpecialist: ['', [Validators.required,
      Validators.max(99)]],
      dniSpecialist: ['', [Validators.required,
      Validators.min(10000000),
      Validators.max(99000000)]],
      emailSpecialist: ['', [Validators.required,
      Validators.email]],
      passwordSpecialist: ['', [Validators.required,
      Validators.maxLength(20)]],
      speciality: ['', Validators.required],
      recaptcha: ['', Validators.required]

    });
  }

  ///patients
  get agePatientControl(): AbstractControl {
    return this.form.get('agePatient').value;
  }
  get firstNamePatientControl(): AbstractControl {
    return this.form.get('firstNamePatient').value;
  }
  get lastNamePatientControl(): AbstractControl {
    return this.form.get('lastNamePatient').value;
  }
  get emailPatientControl(): AbstractControl {
    return this.form.get('emailPatient').value;
  }
  get dniPatientControl(): AbstractControl {
    return this.form.get('dniPatient').value;
  }
  get passwordPatientControl(): AbstractControl {
    return this.form.get('passwordPatient').value;
  }
  get socialWorkPatientControl(): AbstractControl {
    return this.form.get('socialWork').value;
  }
  ///specialists

  get ageSpecialistControl(): AbstractControl {
    return this.form.get('ageSpecialist').value;
  }
  get firstNameSpecialistControl(): AbstractControl {
    return this.form.get('firstNameSpecialist').value;
  }
  get lastNameSpecialistControl(): AbstractControl {
    return this.form.get('lastNameSpecialist').value;
  }
  get emailSpecialistControl(): AbstractControl {
    return this.form.get('emailSpecialist').value;
  }
  get dniSpecialistControl(): AbstractControl {
    return this.form.get('dniSpecialist').value;
  }
  get passwordSpecialistControl(): AbstractControl {
    return this.form.get('passwordSpecialist').value;
  }
  get specialityControl(): AbstractControl {
    return this.form.get('speciality').value;
  }



  public get Form(): any {
    return this.form.controls;
  }

  get LinkPatients(): any {
    return this.linkPatients.nativeElement;
  }

  get LinkSpecialists(): any {
    return this.linkSpecialists.nativeElement;
  }

  get FormPatients(): any {
    return this.formPatients.nativeElement;
  }

  get FormSpecialists(): any {
    return this.formSpecialists.nativeElement;
  }

  ngAfterViewInit(): void {
    console.log(this.LinkPatients);
  }

  getFilePatient(e: any): any {
    for (const file of e.target.files) {
      this.filesPatient.push(file);
    }

    console.log(this.filesPatient);
  }

  getFileSpecialist(e: any): any {
    for (const file of e.target.files) {
      this.filesSpecialist.push(file);
    }

    console.log(this.filesSpecialist);
  }

  UploadFilePatients() {
    for (const file of this.filesPatient) {
      this.filePathReference = `patients/${this.emailPatientControl}_${this.firstNamePatientControl}.png`;
      this.userService.uploadFile(file, "patients", this.emailPatientControl, this.firstNamePatientControl).then(res => {
        this.userService.downloadFile(this.filePathReference).subscribe(res => {
          console.log(res);
          this.filePath = res;
          this.addPatient();
        });
      })


    }

  }

 
  rapidAccess(user: string): void {
    switch (user) {
      case 'user1':
        this.Email = "miriam@gmail.com";
        this.Password = '123456';
        this.login();
        break;
      case 'user2':
        this.Email = "pablo@gmail.com";
        this.Password = '123456';
        this.login();
        break;
      case 'user3':
        this.Email = "maxi@gmail.com";
        this.Password = '123456';
        this.login();

        break;
      case 'user4':
        this.Email = "lionel@gmail.com";
        this.Password = '123456';
        this.login();

        break;
      case 'user5':
        this.Email = "pepe@gmail.com";
        this.Password = '123456';
        this.login();

        break;
      case 'user6':
        this.Email = "maradona@gmail.com";
        this.Password = 'marado';
        this.login();

        break;

      default:
        break;
    }
  }


  UploadFileSpecialist(): void {
    for (const file of this.filesSpecialist) {
      this.filePathReference = `specialists/${this.emailSpecialistControl}_${this.firstNameSpecialistControl}.png`;
      this.userService.uploadFile(file, "specialists", this.emailSpecialistControl, this.firstNameSpecialistControl).then(res => {
        this.userService.downloadFile(this.filePathReference).subscribe(res => {
          console.log(res);
          this.filePath = res;
          this.addSpecialist();
        });
      })


    }

  }

  getIDPatient(): void {
    this.userService.Patients.subscribe(res => {
      res.forEach(r => {
        if (r.data().email === this.emailPatientControl &&
          r.data().password === this.passwordPatientControl) {
          this.id = r.id;
        }
      });
    });

  }
  getIDSpecialist(): void {
    this.userService.Specialists.subscribe(res => {
      res.forEach(r => {
        if (r.data().email === this.emailSpecialistControl &&
          r.data().password === this.passwordSpecialistControl) {
          this.id = r.id;
        }
      });
    });

  }

  showModal(): void {
    const el = this.modalRegister.nativeElement;
    this.renderer.addClass(el, 'show');
  }
  addPatient() {
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

    setTimeout(() => {
      this.showModal();
    }, 1000);
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


  }

  addEstadistica(user:string){
    var f = new Date();
    this.estadisticaService.addEstadistica({
      user: user,
      day: f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear(),
      hour: f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds()
    }).then(res => {
      console.log(res);
      this.router.navigate(['myShifts']);
    }).catch(err => {
      console.log(err);
    });

  }
  addEstadisticaAdmin(user:string){
    var f = new Date();
    this.estadisticaService.addEstadistica({
      user: user,
      day: f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear(),
      hour: f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds()
    }).then(res => {
      this.router.navigate(['admin']);
    }).catch(err => {
      console.log(err);
    });

  }
  addSpecialist() {

    this.userService.addSpecialist({
      firstName: this.firstNameSpecialistControl,
      lastName: this.lastNameSpecialistControl,
      age: this.ageSpecialistControl,
      dni: this.dniSpecialistControl,
      email: this.emailSpecialistControl,
      password: this.passwordSpecialistControl,
      speciality: this.specialityControl,
      disponibility: '00 - 00',
      access: false,
      photo: this.filePath
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })


    setTimeout(() => {
      this.showModal();
    }, 1000);
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

  changeFormPatients(): void {
    this.renderer.addClass(this.LinkPatients, "active");
    this.renderer.removeClass(this.LinkSpecialists, "active");
    this.renderer.addClass(this.FormPatients, "active");
    this.renderer.removeClass(this.FormSpecialists, "active");
  }

  changeFormSpecialists(): void {
    this.renderer.addClass(this.LinkSpecialists, "active");
    this.renderer.removeClass(this.LinkPatients, "active");
    this.renderer.addClass(this.FormSpecialists, "active");
    this.renderer.removeClass(this.FormPatients, "active");
  }



  //////
  getPatients():void{
    this.userService.Patients.subscribe(res => {
      res.forEach(r => {
        let patient:Patient = new Patient(r.id,
                                          r.data().firstName,
                                          r.data().lastName,
                                          r.data().age,
                                          r.data().dni,
                                          r.data().email,
                                          r.data().password,
                                          r.data().socialWork,
                                          r.data().photo);

        this.patients.push(patient);
      });

    });
    console.log(this.patients)
  }

  getSpecialists():void{
    this.userService.Specialists.subscribe(res => {
      res.forEach(r => {
        let specialist:Specialist = new Specialist( r.id,
                                                    r.data().firstName,
                                                    r.data().lastName,
                                                    r.data().age,
                                                    r.data().dni,
                                                    r.data().email,
                                                    r.data().password,
                                                    r.data().speciality,
                                                    r.data().access,
                                                    r.data().disponibility,
                                                    r.data().photo);

        this.specialists.push(specialist);
      });
    });
  }

  getAdministrators():void{
    this.userService.Administrators.subscribe(res => {
      res.forEach(r => {
        let administrator:Administrator = new Administrator(r.id,
                                                            r.data().firstName,
                                                            r.data().lastName,
                                                            r.data().age,
                                                            r.data().dni,
                                                            r.data().email,
                                                            r.data().password,
                                                            r.data().photo);

        this.administrators.push(administrator);
      });
    });
  }

  isRegister():string{
    for (const pat of this.patients) {
      if (this.userValid(pat)) {
        this.isPatient = true;
        this.currentUser = pat;
        console.log(typeof pat)
        return "register";
        
      }
    }
    console.log(this.specialists)
    for (const spe of this.specialists) {
      
      if (this.userValid(spe)) {
        if (this.accessValid(spe)) {
          this.isSpecialist = true;
          this.currentUser = spe;
          return "access";
          
        }else{
          return "no-access";
        }
      }
      
    }
    for (const adm of this.administrators) {
      if (this.userValid(adm)) {
        this.isAdministrator = true;
        this.currentUser = adm;
        return "register";
      }
    }
    return "error";
  }

  userValid(user:any):boolean{
    if (user.email === this.Email && user.password === this.Password) {
      return true;
    }
    return false;
  }

  accessValid(spe:Specialist):boolean{
    return spe.access;
  }

  sendDataLoginPatient(data:Patient):void{
    this.userService.dataLoginPatient(data);
  }

  login():void{
    console.log(this.currentUser)
    console.log(this.isRegister())
    if (this.isRegister() === "access" || this.isRegister() === "register") {
      if (this.isPatient) {
        localStorage.setItem("patient", JSON.stringify(this.currentUser));
        this.addEstadistica(this.currentUser.firstName + ' ' + this.currentUser.lastName);
      }else if(this.isSpecialist){
        localStorage.setItem("specialist", JSON.stringify(this.currentUser));
        this.addEstadistica(this.currentUser.firstName + ' ' + this.currentUser.lastName);
        
      }else if(this.isAdministrator){
        localStorage.setItem("administrator", JSON.stringify(this.currentUser));
        this.addEstadisticaAdmin(this.currentUser.firstName + ' ' + this.currentUser.lastName);

      }
      
    }else if(this.isRegister() === "no-access"){
      alert('The specialist does not have access');
    }else{
      alert('no registed');
    }
  }

}
