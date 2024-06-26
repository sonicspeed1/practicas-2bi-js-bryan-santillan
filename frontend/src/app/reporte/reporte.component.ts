import { Component,OnInit } from '@angular/core';
import { GastoService } from '../gasto.service';
import { Gasto } from '../gasto';
import { Impuesto } from '../impuesto';
@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit{
  gastos: Gasto[] = [];
  impuestos: Impuesto[] = [];

  constructor(private gastoService: GastoService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.gastoService.obtenerDatos().subscribe(data => {
      console.log(data);
      this.gastos = data;
    });
    this.gastoService.obtenerimpuesto().subscribe(data => {
      console.log(data);
      this.impuestos = data;
    });
  }

  eliminarGasto(id: number): void {
    this.gastoService.eliminarGasto(id).subscribe(response => {
      console.log('Gasto eliminado', response);
      this.cargarDatos(); 
    });
  }

}
