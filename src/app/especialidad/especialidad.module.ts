import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartidoModule } from '../compartido/compartido.module';
import { MaterialModule } from '../material/material.module';
import { EspecialidadService } from './servicios/especialidad.service';
import { ListaEspecialidadComponent } from './pages/lista-especialidad/lista-especialidad.component';
import { ModalEspecialidadComponent } from './modales/modal-especialidad/modal-especialidad.component';



@NgModule({
  declarations: [
    
    ListaEspecialidadComponent,
         ModalEspecialidadComponent
  ],
  imports: [
    CommonModule,
    CompartidoModule,
    MaterialModule
  ],

  providers: [
    EspecialidadService
  ]
})
export class EspecialidadModule { }
