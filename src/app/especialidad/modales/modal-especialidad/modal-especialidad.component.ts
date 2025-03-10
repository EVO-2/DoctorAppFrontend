import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { especialidad } from 'src/app/interfaces/especialidad';
import { EspecialidadService } from '../../servicios/especialidad.service';
import { CompartidoService } from 'src/app/compartido/compartido.service';

@Component({
  selector: 'app-modal-especialidad',
  templateUrl: './modal-especialidad.component.html',
  styleUrls: ['./modal-especialidad.component.css']
})
export class ModalEspecialidadComponent implements OnInit{
  formEspecialidad: FormGroup;
  titulo: string = "Agregar";
  nombreBoton: string = "Guardar"
  
  constructor(private modal: MatDialogRef<ModalEspecialidadComponent>, 
    @Inject(MAT_DIALOG_DATA) public datosEspecialidad: especialidad, 
  private fb: FormBuilder, 
  private _especialidadServicio: EspecialidadService,
  private _compartidoServicio: CompartidoService ){

    this.formEspecialidad = this.fb.group({
      nombreEspecialidad: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['1', Validators.required]
    });

    if(this.datosEspecialidad != null) {
      this.titulo = 'Editar';
      this.nombreBoton = 'Actualizar';
    }

  }
  
  ngOnInit(): void {
    if(this.datosEspecialidad !=null)
    {
      this.formEspecialidad.patchValue({
        nombreEspecialidad: this.datosEspecialidad.nombreEspecialidad,
        descripcion: this.datosEspecialidad.descripcion,
        estado: this.datosEspecialidad.estado.toString()
      })
    }
  }

  crearModificarEspecialidad(){
    const especialidad: especialidad = {
      id: this.datosEspecialidad == null ? 0 : this.datosEspecialidad.id,
      nombreEspecialidad: this.formEspecialidad.value.nombreEspecialidad,
      descripcion: this.formEspecialidad.value.descripcion,
      estado: parseInt(this.formEspecialidad.value.estado)
      
    }
    if(this.datosEspecialidad == null)
    {
      //crear nueva especialidad
      this._especialidadServicio.crear(especialidad).subscribe({
        next: (data) => {
          if(data.isExitoso)
          {
            this._compartidoServicio.mostrarAlerta('La especialidad ha sido grabada con exito!',
                                                    'Completo'
            );
            this.modal.close("true");
          }
          else
            this._compartidoServicio.mostrarAlerta('No se pudo crear la especialidad',
          'Error!');
        },
        error: (e) => {
          this._compartidoServicio.mostrarAlerta(e.error.errores,
            'Error!');
        }
      })
    }
    else {
      // Editar/actualizar Especialidad
      this._especialidadServicio.editar(especialidad).subscribe({
        next: (data) => {
          if(data.isExitoso)
          {
            this._compartidoServicio.mostrarAlerta('La especialidad ha sido actualizada con exito!',
                                                    'Completo'
            );
            this.modal.close("true");
          }
          else
            this._compartidoServicio.mostrarAlerta('No se pudo actualizar la especialidad',
          'Error!');
        },
        error: (e) => {}
      })
    }
  }

}
