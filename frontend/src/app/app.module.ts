import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';
import { GastoService } from './gasto.service';
import { UsuarioService } from './usuario.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { InformacionComponent } from './informacion/informacion.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ImpuestoComponent } from './impuesto/impuesto.component';
import { UsuarioComponent} from './usuario/usuario.component';

const rutas: Routes = [ // Se corrige 'Route' a 'Routes'
  { path: 'informacion', component: InformacionComponent },
  { path: 'registro', component: FormularioComponent },
  { path: 'reporte', component: ReporteComponent },
  { path: 'impuesto', component: ImpuestoComponent },
  { path: 'usuario', component: UsuarioComponent},
  { path: '', redirectTo: '/informacion', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/informacion', pathMatch: 'full' } 
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InformacionComponent,
    FormularioComponent,
    ReporteComponent,
    ImpuestoComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(rutas),
    HttpClientModule
  ],
  providers: [GastoService,UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
