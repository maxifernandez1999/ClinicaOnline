export class Administrator {
      public id:string;
      public firstName:string;
      public lastName:any;
      public age:string;
      public dni:string;
      public email:string;
      public password:string;
      public photo:string

      constructor(id:string,
                  firstName:string,
                  lastName:string,
                  age:string,
                  dni:string,
                  email:string,
                  password:string,
                  photo:string) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
            this.dni = dni;
            this.email = email;
            this.id = id;
            this.password = password;
            this.photo = photo;
      }
}
