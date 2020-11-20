import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApieventotienetipoService } from '../services/apieventotienetipo.service';
import { Evento } from '../Models/Evento'
import { ModalDirective } from 'angular-bootstrap-md';
import { ApieventopatrocinadopatrocinadorService } from '../services/apieventopatrocinadopatrocinador.service';


@Component({
  selector: 'app-organizer-challenge',
  templateUrl: './organizer-challenge.component.html',
  styleUrls: ['./organizer-challenge.component.scss']
})
export class OrganizerChallengeComponent implements OnInit {
    public cedula = '';
    public listEvent = [];
    public listSponsor = [];
    public modal;
    public periodo;
    @ViewChild('SponsorModal') public SponsorModal: ModalDirective;
    editField: string;
    validatingForm: FormGroup;

  constructor(
      private apievento: ApieventotienetipoService,
      private apiPatrocinadores: ApieventopatrocinadopatrocinadorService,
      private route: ActivatedRoute
      ) { }

  ngOnInit(): void {
      this.cedula = this.route.snapshot.paramMap.get('cedula');
      this.getEvent();

    this.validatingForm = new FormGroup({
      contactFormModalName: new FormControl('', Validators.required),
      contactFormModalDateI: new FormControl('', Validators.required),
      contactFormModalDateF: new FormControl('', Validators.required),
      contactFormModalType: new FormControl('', Validators.required), //de fondo o profundidad
      contactFormModalActivity: new FormControl('', Validators.required),
      contactFormModalPrivacy: new FormControl('', Validators.required),
      contactFormModalSponsors: new FormControl('', Validators.required),
    });
  }

  getSponsors(i){
      this.apiPatrocinadores.getSponsor(this.cedula, this.listEvent[i].idEvento).subscribe(reply => {
          console.log(reply);
          this.listSponsor = reply.data;
        });

        if(this.listSponsor.length == 0){
            alert("no hay patrocinadores para este evento")
        }else{
            this.SponsorModal.show();
        }
  }

  getEvent(){
       this.apievento.getEventType(this.cedula,"2").subscribe(reply => {
          console.log(reply);
          this.listEvent = reply.data;
        });
    }

    addEvent(){

        const evento: Evento  = {
            Nombre: this.contactFormModalName.value,
            Fecha: this.contactFormModalDateI.value,
            IdAdmin: this.cedula,
            Recorrido:  "no tiene", //this.contactFormModalRoute.value, FALTA
            Cuenta: null,
            Categoria: null,
            Costo: 0, //falta
            Privado: this.contactFormModalPrivacy.value,
            IdDeporte: this.contactFormModalActivity.value,
            Kilometraje: 0, //falta
            Elevación: 0, //falta
            FechaFinal: this.contactFormModalDateI.value,
            FechaInicial: this.contactFormModalDateF.value,
            FondoAltitud: this.contactFormModalType.value,
            Foto: null //falta
    };

        this.apievento.add(evento,"2").subscribe(reply => {
          console.log(reply);
        });
    }

  updateList(id: number, direc: string, property: string, event: any) {
      const editField = event.target.textContent;
      this.listEvent[id][direc][property] = editField;

      this.apievento.edit(this.listEvent[id]).subscribe(reply => {
          console.log(reply);
        });

      console.log(this.listEvent[id]);
    }

  remove(id: any) {
        console.log(this.listEvent[id]);
        this.apievento.delete(this.listEvent[id].idEvento, this.listEvent[id].idTipoEvento).subscribe(reply => {
          console.log(reply);
        });

        //this.awaitingPersonList.push(this.personList[id]);
        //this.personList.splice(id, 1);
  }


  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  get contactFormModalName() {
    return this.validatingForm.get('contactFormModalName');
  }

  get contactFormModalDateI() {
    return this.validatingForm.get('contactFormModalDateI');
  }

  get contactFormModalDateF() {
    return this.validatingForm.get('contactFormModalDateI');
  }


  get contactFormModalType() {
    return this.validatingForm.get('contactFormModalType');
  }

  get contactFormModalActivity() {
    return this.validatingForm.get('contactFormModalActivity');
  }

  get contactFormModalPrivacy() {
    return this.validatingForm.get('contactFormModalPrivacy');
  }


  get contactFormModalSponsors() {
    return this.validatingForm.get('contactFormModalSponsors');
  }


}