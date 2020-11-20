import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ModalDirective } from 'angular-bootstrap-md';
import { ApieventotienetipoService } from '../services/apieventotienetipo.service';

@Component({
  selector: 'app-challenging',
  templateUrl: './challenging.component.html',
  styleUrls: ['./challenging.component.scss']
})
export class ChallengingComponent implements OnInit {
  @ViewChild('frame') public frame: ModalDirective;
  @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
  validatingForm: FormGroup;
  public listChallange = [];

  infoNombre : string;
  infoFinicial :string;
  infoFfinal: string;
  infoKilometraje: string;
  infoElevacion: string;
  //infoPrivado: string;

  constructor(
      private apiEventoTieneTipo: ApieventotienetipoService
  ) { }


  ngOnInit(): void {
      this.getEvent();


    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
  }

  getEvent(){
      this.apiEventoTieneTipo.getEvent("2").subscribe(reply => { // 1 para reto
          console.log(reply);
          this.listChallange = reply.data;
      });
  }

  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }

  showChallengeInfo(i){
    this.infoNombre= this.listChallange[i].idEventoNavigation.nombre;
    this.infoFinicial = this.listChallange[i].idEventoNavigation.fechaInicial;
    this.infoFfinal = this.listChallange[i].idEventoNavigation.fechaFinal;
    this.infoKilometraje = this.listChallange[i].idEventoNavigation.kilometraje;
    this.infoElevacion = this.listChallange[i].idEventoNavigation.actividadPerteneceEvento.elevación;
    //this.infoPrivado = this.listChallange[i].idEventoNavigation.privado;
    
      this.frame.show();
  }

  hideChallengeInfo(){
  
      this.frame.hide();
      this.confirmationModal.show();

  }

}


