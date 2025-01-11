import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titulo: string = 'Bienvenido a DoctorApp';
  usuarios: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No se encontró un token de autenticación');
      // Opcional: Redirigir al usuario a la página de inicio de sesión
      //this.router.navigate(['login']);
      return;
    }

    this.http.get('http://localhost:5003/api/Usuario', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: response => this.usuarios = response,
      error: error => console.log('Error al cargar usuarios:', error),
      complete: () => console.log('La solicitud está completa')
    });
  }
}
