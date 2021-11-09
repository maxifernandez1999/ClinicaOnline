export class ClinicHistory {
      public height:number;
      public weight:number;
      public temperature:number;
      public pressure:number;
      public bloodType:string;
      public patientName:string;
      public id:string;
      public specialistName:string;
      public idShift:string;

      constructor(id:string,
                  height:number,
                  weight:number,
                  temperature:number,
                  pressure:number,
                  bloodType:string,
                  patientName:string,
                  specialistName:string,
                  idShift:string
                  ) {
      this.id = id;
      this.patientName = patientName;
      this.height = height;
      this.weight = weight;
      this.temperature = temperature;
      this.pressure = pressure;
      this.bloodType = bloodType;
      this.specialistName = specialistName;
      this.idShift = idShift;
            
      }
}
