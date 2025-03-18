import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/especialidad/interfaces/api-response';
import { environments } from 'src/environments/environments';
import { Medico } from '../interfaces/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

 baseUrl: string = environments.apiUrl + 'medico/';
 
 
   constructor(private http: HttpClient) { }
 
   lista() : Observable<ApiResponse> {
     return this.http.get<ApiResponse>(`${this.baseUrl}`)
   }
 
   crear(request: Medico): Observable<ApiResponse> {
     return this.http.post<ApiResponse>(`${this.baseUrl}`, request);
   }
 
   editar(request: Medico): Observable<ApiResponse> {
     return this.http.put<ApiResponse>(`${this.baseUrl}`, request);
   }
   eliminar(id: number): Observable<ApiResponse> {
     return this.http.delete<ApiResponse>(`${this.baseUrl}${id}`);
   }
  }
