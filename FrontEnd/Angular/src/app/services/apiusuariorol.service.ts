import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reply } from '../Models/reply'
import { usuariorol } from '../Models/usuario';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'appliacation/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ApiusuariorolService {
  url: string = "https://localhost:44385/api/UsuarioRol";

  constructor(private _http: HttpClient) { }

  getUser(): Observable<Reply> {
    return this._http.get<Reply>(this.url);
  }

  add(usuariorol: usuariorol): Observable<Reply> {
    return this._http.post<Reply>(this.url, usuariorol, httpOption)
  }
}
