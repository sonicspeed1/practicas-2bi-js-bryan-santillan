import { Component } from '@angular/core';
import { Impuesto } from '../impuesto';
import { GastoService } from '../gasto.service';

@Component({
  selector: 'app-impuesto',
  templateUrl: './impuesto.component.html',
  styleUrls: ['./impuesto.component.css']
})
export class ImpuestoComponent {
  constructor(private gastoService: GastoService) {}
  cedula: string = '';
  sueldo: number = 0;
  vivienda: number = 0;
  educacion: number = 0;
  salud: number = 0;
  vestimenta: number = 0;
  alimentacion: number = 0;
  mensaje: string='';
  totl: number=0;
  b_imponible:number=0;
  excedente: number=0;
  f_basica: number=0;
  Porcentaje_Excedente: number=0;
  im_fr_ba:number=0;
  impuesto_renta:number=0;
  calcularImpuesto() {
    const limiteSalud = 15238.60;
    const limiteVivienda = 3809.65;
    const limiteEducacion = 3809.65;
    const limiteVestimenta = 3809.65;
    const limiteAlimentacion = 3809.65;
  
    if (this.salud <= limiteSalud && this.vivienda <= limiteVivienda && this.educacion <= limiteEducacion && this.vestimenta <= limiteVestimenta && this.alimentacion <= limiteAlimentacion) {
      this.totl = this.gastototal(this.vivienda, this.salud, this.vestimenta, this.educacion, this.alimentacion);
      if (this.gastosestado(this.totl)) {
        this.b_imponible = this.base_imponible(this.sueldo, this.totl);
        this.f_basica = this.fraccionbasica(this.b_imponible);
        this.excedente = this.exced(this.b_imponible, this.f_basica);
        this.Porcentaje_Excedente = this.imp_frac_exc(this.b_imponible, this.excedente);
        this.im_fr_ba = this.imp_fr_basico(this.b_imponible);
        this.impuesto_renta = this.impuesto_r(this.Porcentaje_Excedente, this.im_fr_ba);
        this.mensaje = `El impuesto que le toca pagar es de: ${this.impuesto_renta}`;
        const nuevoimpuesto: Impuesto = {
          cedula: this.cedula,
          ingreso: this.sueldo ,
          vivienda: this.vivienda,
          educacion: this.educacion ,
          salud: this.salud ,
          vestimenta: this.vestimenta ,
          alimentacion: this.alimentacion,
          gastos: this.totl,
          baseimponible:this.b_imponible,
          excedente: this.excedente,
          fraccionbasica: this.f_basica,
          Porcentaje_Excedente: this.Porcentaje_Excedente,
          impuesto_fraccion_basica: this.im_fr_ba,
          impuesto_renta:this.impuesto_renta,
        };
        this.gastoService.agregarimpuesto(nuevoimpuesto).subscribe(
          response => {
            console.log('Factura guardada exitosamente', response);
          },
          error => {
            console.error('Error al guardar la factura', error);
          }
        );
      } else {
        this.mensaje = `Gastos excedidos, imposible calcular. Solo se puede calcular hasta 15238.60. Gastos totales: ${this.totl}`;
      }
    } else {
      let mensajes: string[] = [];
  
      if (this.salud > limiteSalud) {
        mensajes.push(`Salud excede el límite de ${limiteSalud}`);
      }
  
      if (this.vivienda > limiteVivienda) {
        mensajes.push(`Vivienda excede el límite de ${limiteVivienda}`);
      }
  
      if (this.educacion > limiteEducacion) {
        mensajes.push(`Educación excede el límite de ${limiteEducacion}`);
      }
  
      if (this.vestimenta > limiteVestimenta) {
        mensajes.push(`Vestimenta excede el límite de ${limiteVestimenta}`);
      }
  
      if (this.alimentacion > limiteAlimentacion) {
        mensajes.push(`Alimentación excede el límite de ${limiteAlimentacion}`);
      }
  
      this.mensaje = mensajes.join(", ");
    }
  }
  gastosestado(gasto: number) {
    return gasto <= 15238.60;
  }

  gastototal(...valores: number[]) {
    return valores.reduce((a, b) => a + b, 0);
  }

  fraccionbasica(valor: number) {
    if (valor <= 11722) return 0;
    if (valor <= 14930) return 11722;
    if (valor <= 19385) return 14930;
    if (valor <= 25638) return 19385;
    if (valor <= 33738) return 25638;
    if (valor <= 44721) return 33738;
    if (valor <= 59537) return 44721;
    if (valor <= 79388) return 59537;
    if (valor <= 105580) return 79388;
    return 105580;
  }

  base_imponible(v1: number, v2: number) {
    return v1 - v2;
  }

  imp_frac_exc(valor: number, exce: number) {
    if (valor <= 11722) return exce * 0;
    if (valor <= 14930) return exce * 0.05;
    if (valor <= 19385) return exce * 0.1;
    if (valor <= 25638) return exce * 0.12;
    if (valor <= 33738) return exce * 0.15;
    if (valor <= 44721) return exce * 0.2;
    if (valor <= 59537) return exce * 0.25;
    if (valor <= 79388) return exce * 0.3;
    if (valor <= 105580) return exce * 0.35;
    return exce * 0.37;
  }

  imp_fr_basico(valor: number) {
    if (valor <= 11722) return 0;
    if (valor <= 14930) return 0;
    if (valor <= 19385) return 160;
    if (valor <= 25638) return 606;
    if (valor <= 33738) return 1356;
    if (valor <= 44721) return 2571;
    if (valor <= 59537) return 4768;
    if (valor <= 79388) return 8472;
    if (valor <= 105580) return 14427;
    return 23594;
  }

  exced(v1: number, v2: number) {
    return v1 - v2;
  }

  impuesto_r(v1: number, v2: number) {
    return v1 + v2;
  }

}