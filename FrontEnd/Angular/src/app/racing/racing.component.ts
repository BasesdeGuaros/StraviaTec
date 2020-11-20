import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ModalDirective } from 'angular-bootstrap-md';
import { ApieventotienetipoService } from '../services/apieventotienetipo.service';



@Component({
  selector: 'app-racing',
  templateUrl: './racing.component.html',
  styleUrls: ['./racing.component.scss']
})
export class RacingComponent implements OnInit {
  @ViewChild('frame') public frame: ModalDirective;
  validatingForm: FormGroup;
  public listRace = [];

  infoNombre : string;
  infoFinicial :string;
  infoFfinal: string;
  infoKilometraje: string;
  infoCosto: string;
  infoCuenta:string;
  infoPrivado: string;
  

  constructor(
      private apiEventoTieneTipo: ApieventotienetipoService
  ) { }

  races = [{"name":"Carrera CE","descript":"description of ce carrier"},
  {"name":"Amazing Race","descript":"amazing race its the better"},
  {"name":"Carrera Garza","descript":"fuck daniel sing and elias are gays"}]

  ngOnInit(): void {
      this.getEvent();
    this.validatingForm = new FormGroup({
      voucher: new FormControl('', Validators.required)
    });
  }
  
  getEvent(){
      this.apiEventoTieneTipo.getEvent("1").subscribe(reply => { // 1 para carrera
          console.log(reply);
          this.listRace = reply.data;
      });
      
  }

  get voucher() {
    return this.validatingForm.get('voucher');
  }

  showRaceInfo(i){
    this.infoNombre= this.listRace[i].idEventoNavigation.nombre;
    this.infoFinicial = this.listRace[i].idEventoNavigation.fechaInicial;
    this.infoFfinal = this.listRace[i].idEventoNavigation.fechaFinal;
    this.infoKilometraje = this.listRace[i].idEventoNavigation.kilometraje;
    this.infoCosto = this.listRace[i].idEventoNavigation.actividadPerteneceEvento.costo;
    this.infoCuenta = this.listRace[i].idEventoNavigation.actividadPerteneceEvento.cuenta;
    this.infoPrivado = this.listRace[i].idEventoNavigation.privado;
    
      this.frame.show()
  }

  
}



