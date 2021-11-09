export class Shift {
      public id:string;
      public patientName?:string;
      public specialist:any;
      public speciality:string;
      public date:string;
      public time:string;
      public state:string;
      public commentary:string;
      public attention:string;
      public diagnosis:string;

      constructor(id:string,
                  patientName:string,
                  specialist:string,
                  speciality:string,
                  date:string,
                  time:string,
                  state:string,
                  commentary:string,
                  attention:string,
                  diagnosis:string) {
            this.patientName = patientName;
            this.specialist = specialist;
            this.speciality = speciality;
            this.date = date;
            this.time = time;
            this.id = id;
            this.state = state;
            this.commentary = commentary;
            this.attention = attention;
            this.diagnosis = diagnosis;
      }
}
