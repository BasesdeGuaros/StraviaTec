import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  

  getUser(username: string, rol: string): Observable<Reply> {
    return this._http.get<Reply>(`${this.url}/${username}/${rol}`);
  }

  getFriend(friendname: string): Observable<Reply> {
    return this._http.get<Reply>(`${this.url}/${friendname}`);
  }


  addUser(usuariorol: usuariorol): Observable<Reply> {
    return this._http.post<Reply>(this.url, usuariorol, httpOption)
  }

  edit(usuario: usuariorol): Observable<Reply> {
        return this._http.put<Reply>(this.url, usuario, httpOption)
    }

    

}
