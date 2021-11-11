import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent implements OnInit {

  formAdmin : FormGroup;
  filesAdmin:any[] = [];
  filePathReference:string;
  filePath:string;
  constructor(private fb:FormBuilder,
              private userService:UsersService) { }
         
  ngOnInit(): void {
    this.initForm();
  }

  get ageControl():AbstractControl{
    return this.formAdmin.get('age').value;
  }
  get firstNameControl():AbstractControl{
    return this.formAdmin.get('firstName').value;
  }
  get lastNameControl():AbstractControl{
    return this.formAdmin.get('lastName').value;
  }
  get emailControl():AbstractControl{
    return this.formAdmin.get('email').value;
  }
  get dniControl():AbstractControl{
    return this.formAdmin.get('dni').value;
  }
  get passwordControl():AbstractControl{
    return this.formAdmin.get('password').value;
  }
  public get Form():any{
    return this.formAdmin.controls;
  }
  addAdmin():void{
    this.userService.addAdministrator({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      age: this.ageControl,
      dni: this.dniControl,
      email: this.emailControl,
      password: this.passwordControl,
      photo: this.filePath
    }).then(res => {
      console.log(res);
      alert("added");
    }).catch(err => {
      console.log(err);    
    });
  }
  getFileAdmin(e:any):any{
    console.log(e);
    for (const file of e.target.files) {
      this.filesAdmin.push(file);
    }
  }
  UploadFileAdmin(): void {
    for (const file of this.filesAdmin) {
      this.filePathReference = `administrators/${this.emailControl}_${this.firstNameControl}.png`;
      this.userService.uploadFile(file, "administrators", this.emailControl, this.firstNameControl).then(res => {
        this.userService.downloadFile(this.filePathReference).subscribe(res => {
          console.log(res);
          this.filePath = res;
          this.addAdmin();
        });
      })


    }

  }
  initForm():void{
    this.formAdmin = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      age: [
        '',
        [
          Validators.required,
          Validators.max(99)
        ]
      ],
      dni: [
        '',
        [
          Validators.required,
          Validators.min(10000000),
          Validators.max(99000000)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ]
    });
  }


}
