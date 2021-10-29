

export class Patient {

      public id:string;
      public firstName:string;
      public lastName:any;
      public age:string;
      public dni:string;
      public email:string;
      public password:string;
      public socialWork:string;
      public photo:string;

      constructor(id:string,
                  firstName:string,
                  lastName:string,
                  age:string,
                  dni:string,
                  email:string,
                  password:string,
                  socialWork:string,
                  photo:string) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
            this.dni = dni;
            this.email = email;
            this.password = password;
            this.socialWork = socialWork;
            this.id = id;
            this.photo = photo;
      }
      
}
