import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { ApiResponse } from '../interfaces/api-response';
import { especialidad } from 'src/app/interfaces/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  baseUrl: string = environments.apiUrl + 'especialidad/';


  constructor(private http: HttpClient) { }

  lista() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}`)
  }

  crear(request: especialidad): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}`, request);
  }

  editar(request: especialidad): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}`, request);
  }
  eliminar(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}${id}`);
  }
}

