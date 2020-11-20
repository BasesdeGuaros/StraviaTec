import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reply } from '../Models/reply'
import { usuariosigueusuario } from '../Models/usuariosigueusuario';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'appliacation/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ApiusuariosigueusuarioService {
    
    
    url: string = "https://localhost:44385/api/UsuarioSigueUsuario";

    constructor(private _http: HttpClient) { }

    getUser(username: string): Observable<Reply> {
        return this._http.get<Reply>(`${this.url}/${username}`);
    }

    getActivities(cedula: number,other:string,other2:string): Observable<Reply> {
        return this._http.get<Reply>(`${this.url}/${cedula}/${other}/${other2}`);
    }

    getUserCount(username: string,count: number): Observable<Reply> {
        return this._http.get<Reply>(`${this.url}/${username}/${count}`);
    }

    addUser(usuarioSigue: usuariosigueusuario): Observable<Reply> {
        return this._http.post<Reply>(this.url, usuarioSigue, httpOption)
    }

}
