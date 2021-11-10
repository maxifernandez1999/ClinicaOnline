export class Estadistica {
      user: string;
      day: string;
      hour: string;
      id:string;

      constructor(id:string, user: string, day: string, hour: string) {
            this.id = id;
            this.day = day;
            this.hour = hour;
            this.user = user;
      }
}
