export class Shift {
      public id:string;
      public patientName?:string;
      public specialist:any;
      public speciality:string;
      public date:string;
      public time:number;

      constructor(id:string,
                  patientName:string,
                  specialist:string,
                  speciality:string,
                  date:string,
                  time:number) {
            this.patientName = patientName;
            this.specialist = specialist;
            this.speciality = speciality;
            this.date = date;
            this.time = time;
            this.id = id;
      }
}
