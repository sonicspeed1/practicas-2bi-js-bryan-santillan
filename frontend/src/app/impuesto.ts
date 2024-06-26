export interface Impuesto{
    id?: number;
 cedula: string ;
  ingreso: number ;
  vivienda: number ;
  educacion: number ;
  salud: number ;
  vestimenta: number ;
  alimentacion: number ;
  gastos: number;
  baseimponible:number;
  excedente: number;
  fraccionbasica: number;
  Porcentaje_Excedente: number;
  impuesto_fraccion_basica:number;
  impuesto_renta:number;
}