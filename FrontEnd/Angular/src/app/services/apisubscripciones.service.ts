import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reply } from '../Models/reply'
import { Subscripciones } from '../Models/Subscripciones';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'appliacation/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApisubscripcionesService {

    
    url: string = "https://localhost:44385/api/Subscripciones";

    constructor(private _http: HttpClient) { }

    getSubs(cedula: string): Observable<Reply> {
        return this._http.get<Reply>(`${this.url}/${cedula}`);
    }

    addSubs(subs: Subscripciones): Observable<Reply> {
        return this._http.post<Reply>(this.url, subs, httpOption)
    }
}
