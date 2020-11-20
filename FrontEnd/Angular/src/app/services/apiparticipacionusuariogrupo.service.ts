import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reply } from '../Models/reply'
import { Grupo } from '../Models/Grupo'


const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'appliacation/json'
  })
};

@Injectable({
  providedIn: 'root'
})


export class ApiparticipacionusuariogrupoService {

    url: string = "https://localhost:44385/api/ParticipacionUsuarioGrupo";

    constructor(private _http: HttpClient) { }

    getGroup(cedula: string): Observable<Reply> {
        return this._http.get<Reply>(`${this.url}/${cedula}`);
    }

    getGroupParticipants(cedula: string, idGrupo: string): Observable<Reply> {
        return this._http.get<Reply>(`${this.url}/${cedula}/${idGrupo}`);
    }

    add(grupo: Grupo, rol: string, cedula: string): Observable<Reply> {
        return this._http.post<Reply>(`${this.url}/${rol}/${cedula}`, grupo, httpOption)
    }

    edit(grupo: Grupo): Observable<Reply> {
        return this._http.put<Reply>(this.url, grupo, httpOption)
    }

    delete(idGrupo: string, cedula: string): Observable<Reply> {
        return this._http.delete<Reply>(`${this.url}/${idGrupo}/${cedula}`)
    }
}
