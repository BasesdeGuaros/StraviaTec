import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import { ApieventotienetipoService } from '../services/apieventotienetipo.service';
import { ApisubscripcionesService } from '../services/apisubscripciones.service';
import { ApiusuariosigueusuarioService} from '../services/apiusuariosigueusuario.service';

@Component({
  selector: 'app-mis-carreras-retos',
  templateUrl: './mis-carreras-retos.component.html',
  styleUrls: ['./mis-carreras-retos.component.scss']
})
export class MisCarrerasRetosComponent implements OnInit {
 @ViewChild('frameChallenge') public challengeModal: ModalDirective;
 @ViewChild('frameRace') public raceModal: ModalDirective;
  validatingForm: FormGroup;
  public cedula = '';
  public listEvents = [];
  public listRaces = [];
  public listChallenges = [];
  public listActivities = [];
  public listKilometres = [];
  public listProgress = [];

  infoNombre : string;
  infoFinicial :string;
  infoFfinal: string;
  infoKilometraje: string;
  infoFondoAltitud: string;

  constructor(
      private apiusuariosigueusuario: ApiusuariosigueusuarioService,
      private apisubs: ApisubscripcionesService,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
      this.cedula = this.route.snapshot.paramMap.get('cedula');
      this.getSubs();
      this.getActivities();
      this.calculateProgress();

    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
  }

  getSubs(){
      this.apisubs.getSubs2(this.cedula).subscribe(reply => {
          console.log("SUBS");
          console.log(reply);
          this.listEvents = reply.data;
          var i;
          for (i = 0; i <= this.listEvents.length - 1; i++) { 
              
              if (this.listEvents[i].idEventoNavigation.eventoTieneTipo[0].idTipoEvento == 1) { //es una carrera
                  this.listRaces.push(this.listEvents[i]);
                 
              }else if(this.listEvents[i].idEventoNavigation.eventoTieneTipo[0].idTipoEvento == 2){
                  this.listChallenges.push(this.listEvents[i]);
                  var listtemp = [];
                  listtemp.push(this.listEvents[i].idEvento,this.listEvents[i].idEventoNavigation.kilometraje);
                  this.listKilometres.push(listtemp);
                  
              }
        }
        console.log(this.listRaces);
        console.log(this.listChallenges);

        console.log("LISTA KILOMETROS");
        console.log(this.listKilometres);


        var i;
      for(i = 0; i<this.listKilometres.length; i++){
          var j
          var total = this.listKilometres[i][1];
          for(j = 0; j < this.listActivities; j++){
              if(this.listActivities[j].actividadPerteneceEvento[0].idEvento == this.listKilometres[i][0]){
                  this.listKilometres[i][1] = this.listKilometres[i][1] - this.listActivities[j].kilometraje;
              }
          }

          var porcentaje = (this.listKilometres[i][1]*100)/total
          this.listProgress.push(porcentaje);
      }

      console.log("PROGRESS BAR");
      console.log(this.listProgress);


      });
  }


  getActivities(){
        this.apiusuariosigueusuario.getActivities(parseInt(this.cedula),"other","other2").subscribe(reply => {
            console.log("ACTIVITIES");
          console.log(reply);
          this.listActivities = reply.data;
          
    });

  }

  calculateProgress(){
      
  }
  
  

  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }

  showChallengeModalInfo(i){
    this.infoNombre= this.listChallenges[i].idEventoNavigation.nombre;
    this.infoFinicial = this.listChallenges[i].idEventoNavigation.fechaInicial;
    this.infoFfinal = this.listChallenges[i].idEventoNavigation.fechaFinal;
    this.infoKilometraje = this.listChallenges[i].idEventoNavigation.kilometraje;
    this.infoFondoAltitud = this.listChallenges[i].idEventoNavigation.fondoAltitud;
      
      this.challengeModal.show();
  }
  showRaceModalInfo(i){
    this.infoNombre= this.listRaces[i].idEventoNavigation.nombre;
    this.infoFinicial = this.listRaces[i].idEventoNavigation.fechaInicial;
    this.infoFfinal = this.listRaces[i].idEventoNavigation.fechaFinal;
    this.infoKilometraje = this.listRaces[i].idEventoNavigation.kilometraje;
    this.infoFondoAltitud = this.listRaces[i].idEventoNavigation.fondoAltitud;
      this.raceModal.show();
  }


}
