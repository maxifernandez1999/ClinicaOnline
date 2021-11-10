import { Component, OnInit } from '@angular/core';
import { Estadistica } from 'src/app/models/Estadistica';
import { EstadisticasService } from 'src/app/services/estadisticas.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  estadisticas:Estadistica[] = [];
  constructor(private estadisticaService:EstadisticasService) { }

  ngOnInit(): void {
    this.getEstadisticas();
  }
  getEstadisticas(): void {
    this.estadisticaService.Estadisticas.subscribe((res) => {
      res.forEach((r) => {
        let estadistica: Estadistica = new Estadistica(
          r.id,
          r.data().user,
          r.data().day,
          r.data().hour
        );
        this.estadisticas.push(estadistica);
      });
    });
  }

}
