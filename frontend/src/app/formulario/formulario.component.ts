import { Component } from '@angular/core';
import { GastoService } from '../gasto.service';
import { Gasto } from '../gasto';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  ruc: string = '';
  empresa: string = '';
  valor: number = 0;
  gasto: string = '';
  idEliminar: number=0;

  constructor(private gastoService: GastoService) {}

  guardarFactura() {
    const nuevoGasto: Gasto = {
      ruc: this.ruc,
      empresa: this.empresa,
      valor: this.valor,
      gasto: this.gasto
    };

    this.gastoService.agregarGasto(nuevoGasto).subscribe(
      response => {
        console.log('Factura guardada exitosamente', response);
      },
      error => {
        console.error('Error al guardar la factura', error);
      }
    );
  }

  eliminarFactura() {
    this.gastoService.eliminarGasto(this.idEliminar).subscribe(
      response => {
        console.log('Factura eliminada exitosamente', response);
      },
      error => {
        console.error('Error al eliminar la factura', error);
      }
    );
  }
}