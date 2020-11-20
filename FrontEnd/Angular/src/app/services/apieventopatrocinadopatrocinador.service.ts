import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reply } from '../Models/reply'
import { Patrocinador } from '../Models/Patrocinador';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'appliacation/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApieventopatrocinadopatrocinadorService {

    url: string = "https://localhost:44385/api/EventoPatrocinadoPatrocinador";

    constructor(private _http: HttpClient) { }

    getSponsor(idEvento: string): Observable<Reply> {
        return this._http.get<Reply>(`${this.url}/${idEvento}`);
    }

    addSponsor(sponsor: Patrocinador): Observable<Reply> {
        return this._http.post<Reply>(this.url, sponsor, httpOption)
    }
}
