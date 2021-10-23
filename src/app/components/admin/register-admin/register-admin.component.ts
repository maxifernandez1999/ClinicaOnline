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
  getFileAdmin(e:any):any{
    console.log(e);
    for (const file of e.target.files) {
      this.filesAdmin.push(file);
    }
    
    console.log(this.filesAdmin);
  }
  addAdmin():void{
    this.userService.addAdministrator({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      age: this.ageControl,
      dni: this.dniControl,
      email: this.emailControl,
      password: this.passwordControl
    }).then(res => {
      console.log(res);
      alert("added");
    }).catch(err => {
      console.log(err);    
    });
    this.UploadFile('administrators',this.filesAdmin);
  }
  getFile(e:any):any{
    console.log(e);
    for (const file of e.target.files) {
      this.filesAdmin.push(file);
    }
    
    console.log(this.filesAdmin);
  }
  UploadFile(folder:string,files:any):void{
    for (const file of files) {
      this.userService.uploadFile(file,folder,this.emailControl,this.dniControl);
      
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
