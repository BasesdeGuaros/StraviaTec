import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reply } from '../Models/reply'
import { usuario } from '../Models/usuario';


//ng generate service services/apiusuario

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'appliacation/json'
  })
};

@Injectable({
  providedIn: 'root'
})

/**
* Servicio que ofrece el protocolo https para User
* Permite obtener, editar, anadir y eliminar un usuario
* */
export class ApiusuarioService {

  url: string = "https://localhost:44385/api/Usuario";

  constructor(private _http: HttpClient) { }
  
  getUser(): Observable<Reply> {
    return this._http.get<Reply>(this.url);
  }

  //request modificado, ver Controller de progra pasada
  getProducer(rol: string): Observable<Reply> {
    return this._http.get<Reply>(this.url+rol);
  }

  add(user: usuario): Observable<Reply> {
    return this._http.post<Reply>(this.url, user, httpOption)
  }

  edit(user: usuario): Observable<Reply> {
    return this._http.put<Reply>(this.url, user, httpOption)
  }

  //hay que modificarlo o hacer su implementacion 
  delete(userName: string): Observable<Reply> { 
    return this._http.delete<Reply>(`${this.url}/${userName}`)
  }
}
