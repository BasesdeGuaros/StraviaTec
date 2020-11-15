import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ApieventotienetipoService } from '../services/apieventotienetipo.service';
import { ApisubscripcionesService } from '../services/apisubscripciones.service';

@Component({
  selector: 'app-mis-carreras-retos',
  templateUrl: './mis-carreras-retos.component.html',
  styleUrls: ['./mis-carreras-retos.component.scss']
})
export class MisCarrerasRetosComponent implements OnInit {
  validatingForm: FormGroup;
  public cedula = '';
  public listEvents = [];
  public listRaces = [];
  public listChallenges = [];

  constructor(
      private apisubs: ApisubscripcionesService,
      private route: ActivatedRoute


  ) { }

  races = [{"name":"Carrera CE","descript":"description of ce carrier"},
  {"name":"Amazing Race","descript":"amazing race its the better"},
  {"name":"Carrera Garza","descript":"fuck daniel sing and elias are gays"}]

  challenges = [{"name":"Carrera CE","descript":"description of ce carrier"},
  {"name":"Amazing Race","descript":"amazing race its the better"},
  {"name":"Carrera Garza","descript":"fuck daniel sing and elias are gays"}]

  ngOnInit(): void {
      this.cedula = this.route.snapshot.paramMap.get('cedula');
      this.getSubs();

    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
  }

  getSubs(){
      this.apisubs.getSubs(this.cedula).subscribe(reply => {
          console.log(reply);
          this.listEvents = reply.data;
          var i;
          for (i = 0; i <= this.listEvents.length - 1; i++) { 
              
              if (this.listEvents[i].idEventoNavigation.eventoTieneTipo[0].idTipoEvento == 1) { //es una carrera
                  this.listRaces.push(this.listEvents[i]);
              }else{
                  this.listChallenges.push(this.listEvents[i]);
              }
        }
        console.log(this.listRaces);
        console.log(this.listChallenges);
      });
  }
  
  

  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }

}
