import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sesion } from '../usuario/sesion';

@Injectable({
  providedIn: 'root'
})
export class CompartidoService {

  constructor(private _snacBar: MatSnackBar) { }

  mostrarAlerta(mensaje: string, tipo: string) {
    this._snacBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    })
  }

  guardarSesion(sesion: Sesion) {
    localStorage.setItem("usuarioSesion", JSON.stringify(sesion))
  }

  obtenerSecion() {
    const sesionString = localStorage.getItem("usuarioSesion");
    const usuarioToken = JSON.parse(sesionString!);
    return usuarioToken
  }

  eliminarSesion(){
    localStorage.removeItem("usuarioSesion");
  }

}
