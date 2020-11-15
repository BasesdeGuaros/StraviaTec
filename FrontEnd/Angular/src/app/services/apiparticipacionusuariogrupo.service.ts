import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reply } from '../Models/reply'

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

    getGroup(): Observable<Reply> {
        return this._http.get<Reply>(this.url);
    }

    /*addEvent(actividad: actividadPerteneceEvento): Observable<Reply> {
        return this._http.post<Reply>(this.url, actividad, httpOption)
    }*/
}
