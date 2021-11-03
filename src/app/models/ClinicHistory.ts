export class ClinicHistory {
      public height:number;
      public weight:number;
      public temperature:number;
      public pressure:number;
      public bloodType:string;

      constructor(height:number,
                  weight:number,
                  temperature:number,
                  pressure:number,
                  bloodType:string) {
      this.height = height;
      this.weight = weight;
      this.temperature = temperature;
      this.pressure = pressure;
      this.bloodType = bloodType;
            
      }
}
