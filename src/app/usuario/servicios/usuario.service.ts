import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Login } from '../interfaces/login';
import { Observable } from 'rxjs';
import { Sesion } from '../sesion';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string = environments.apiUrl+"usuario/"

  constructor(private http: HttpClient) { }

  iniciarSesion(requets: Login):Observable<Sesion>{
    return this.http.post<Sesion>('${this.baseUrl}login', requets);
  }
}
