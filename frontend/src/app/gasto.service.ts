import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto } from './gasto';
import { Impuesto } from './impuesto';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private apiUrl = 'http://localhost:3000/facturas'; 
  private dar='http://localhost:3000/impuesto';
  constructor(private http: HttpClient) {}

  agregarGasto(gasto: Gasto): Observable<any> {
    return this.http.post<any>(this.apiUrl, gasto);
  }

  agregarimpuesto(impuesto: Impuesto): Observable<any> {
    return this.http.post<any>(this.dar, impuesto);
  }

  obtenerDatos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(this.apiUrl); 
  }

  obtenerimpuesto(): Observable<Impuesto[]> {
    return this.http.get<Impuesto[]>(this.dar); 
  }

  eliminarGasto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}