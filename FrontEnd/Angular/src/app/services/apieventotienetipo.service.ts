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


export class ApieventotienetipoService {
    url: string = "https://localhost:44385/api/EventoTieneTipo";

    constructor(private _http: HttpClient) { }

    getEventType(cedula: string): Observable<Reply> {
        return this._http.get<Reply>(`${this.url}/${cedula}`);
    }

    getEvent(type: string): Observable<Reply> {
        return this._http.get<Reply>(`${this.url}/${type}`);
    }
}
