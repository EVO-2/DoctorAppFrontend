import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaEspecialidadComponent } from '../especialidad/pages/lista-especialidad/lista-especialidad.component';
import { } from '../especialidad/especialidad.module';



const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
      { path: 'especialidades', component: ListaEspecialidadComponent, pathMatch: 'full' },
      {path: '**', redirectTo: '', pathMatch: 'full'}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutingModule { }
