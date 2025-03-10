import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { especialidad } from 'src/app/interfaces/especialidad';
import { EspecialidadService } from '../../servicios/especialidad.service';
import { CompartidoService } from 'src/app/compartido/compartido.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalEspecialidadComponent } from '../../modales/modal-especialidad/modal-especialidad.component';
import Swal from 'sweetalert2';
import { filter } from 'rxjs';

@Component({
  selector: 'app-lista-especialidad',
  templateUrl: './lista-especialidad.component.html',
  styleUrls: ['./lista-especialidad.component.css']
})
export class ListaEspecialidadComponent implements OnInit, AfterViewInit {
 
  displayedColumns: string[] = [
    'nombreEspecialidad',
    'descripcion',
    'estado',
    'acciones'
  ];

  dataSource = new MatTableDataSource<especialidad>([]);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private _especialidadServicio: EspecialidadService,
    private _compartidoService: CompartidoService, // 🔹 CORRECCIÓN AQUÍ
    private dialog: MatDialog
  ) {}

  nuevoEspecialidad() {
    this.dialog
      .open(ModalEspecialidadComponent, { disableClose: true, width: '400px' })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.obtenerEspecialidades();
      });
  }

  editarEspecialidad(especialidad: especialidad) {
    this.dialog
      .open(ModalEspecialidadComponent, {
        disableClose: true,
        width: '400px',
        data: especialidad
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.obtenerEspecialidades();
      });
  }

  obtenerEspecialidades() {
    this._especialidadServicio.lista().subscribe({
      next: (data) => {
        if (data.isExitoso) {
          this.dataSource.data = data.resultado;
          this.dataSource.paginator = this.paginacionTabla; // ✅ Asigna correctamente el paginador
        } else {
          this._compartidoService.mostrarAlerta('No se encontraron datos', 'Advertencia!');
        }
      },
      error: (e) => {}
    });
  }

  removerEspecialidad(especialidad: especialidad) { // 🔹 CORRECCIÓN DEL PARÁMETRO
    Swal.fire({
      title: '¿Desea eliminar la especialidad?',
      text: especialidad.nombreEspecialidad, // 🔹 CORRECCIÓN AQUÍ
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._especialidadServicio.eliminar(especialidad.id).subscribe({
          next: (data) => {
            if (data.isExitoso) {
              this._compartidoService.mostrarAlerta('La especialidad fue eliminada', 'Completo');
              this.obtenerEspecialidades();
            } else {
              this._compartidoService.mostrarAlerta('No se pudo eliminar la especialidad', 'Error!');
            }
          },
          error: (e) => {}
        });
      }
    });
  }

  aplicarFiltroListado(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.obtenerEspecialidades();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginacionTabla;
  }
}
