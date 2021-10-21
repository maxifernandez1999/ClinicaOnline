export class Specialist {
      public id:string;
      public firstName:string;
      public lastName:any;
      public age:string;
      public dni:string;
      public email:string;
      public password:string;
      public speciality:string;

      constructor(id:string,
                  firstName:string,
                  lastName:string,
                  age:string,
                  dni:string,
                  email:string,
                  password:string,
                  speciality:string) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
            this.dni = dni;
            this.email = email;
            this.password = password;
            this.speciality = speciality;
            this.id = id;
      }
      
}
