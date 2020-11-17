import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reply } from '../Models/reply'
import { evento } from '../Models/Evento'
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

    getEventType(cedula: string, type: string): Observable<Reply> {
        return this._http.get<Reply>(`${this.url}/${cedula}/${type}`);
    }

    getEvent(type: string): Observable<Reply> {
        return this._http.get<Reply>(`${this.url}/${type}`);
    }
    
    add(evento: evento, type:string): Observable<Reply> {
        return this._http.post<Reply>(`${this.url}/${type}`, evento, httpOption)
    }

    edit(evento: evento): Observable<Reply> {
        return this._http.put<Reply>(this.url, evento, httpOption)
    }

    delete(idEvento: string, idTipo: string): Observable<Reply> {
        return this._http.delete<Reply>(`${this.url}/${idEvento}/${idTipo}`)
    }
}
