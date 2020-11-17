import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApieventotienetipoService } from '../services/apieventotienetipo.service';
import { Evento } from '../Models/Evento'


@Component({
  selector: 'app-organizer-race',
  templateUrl: './organizer-race.component.html',
  styleUrls: ['./organizer-race.component.scss']
})
export class OrganizerRaceComponent implements OnInit {
    public cedula = '';
    public listEvent = [];
    public modal;


  editField: string;
  validatingForm: FormGroup;

  personList: Array<any> = [
    { id: 1, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
    { id: 2, name: 'Guerra Cortez', age: 45, companyName: 'Insectus', country: 'USA', city: 'San Francisco' },
    { id: 3, name: 'Guadalupe House', age: 26, companyName: 'Isotronic', country: 'Germany', city: 'Frankfurt am Main' },
    { id: 4, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
    { id: 5, name: 'Elisa Gallagher', age: 31, companyName: 'Portica', country: 'United Kingdom', city: 'London' },
  ];

  awaitingPersonList: Array<any> = [
    { id: 6, name: 'George Vega', age: 28, companyName: 'Classical', country: 'Russia', city: 'Moscow' },
    { id: 7, name: 'Mike Low', age: 22, companyName: 'Lou', country: 'USA', city: 'Los Angeles' },
    { id: 8, name: 'John Derp', age: 36, companyName: 'Derping', country: 'USA', city: 'Chicago' },
    { id: 9, name: 'Anastasia John', age: 21, companyName: 'Ajo', country: 'Brazil', city: 'Rio' },
    { id: 10, name: 'John Maklowicz', age: 36, companyName: 'Mako', country: 'Poland', city: 'Bialystok' },
  ];

  constructor(
      private apievento: ApieventotienetipoService,
      private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
      this.cedula = this.route.snapshot.paramMap.get('cedula');
      this.getEvent();
      
      //Validacion del form
      this.validatingForm = new FormGroup({
      contactFormModalName: new FormControl('', Validators.required),
      contactFormModalDate: new FormControl('', Validators.required),
      contactFormModalRoute: new FormControl('', Validators.required),
      contactFormModalActivity: new FormControl('', Validators.required),
      contactFormModalPrivacy: new FormControl('', Validators.required),
      contactFormModalBankAccount: new FormControl('', Validators.required),
      contactFormModalCategory: new FormControl('', Validators.required),
      contactFormModalSponsors: new FormControl('', Validators.required),
    });
  }

    getEvent(){
       this.apievento.getEventType(this.cedula,"1").subscribe(reply => {
          console.log(reply);
          this.listEvent = reply.data;
        });
    }

    addEvent(){

        const evento: Evento  = {
            Nombre: this.contactFormModalName.value,
            Fecha: this.contactFormModalDate.value,
            IdAdmin: this.cedula,
            Recorrido:  "no tiene", //this.contactFormModalRoute.value, FALTA
            Cuenta: this.contactFormModalBankAccount.value,
            Categoria: this.contactFormModalCategory.value,
            Costo: 0, //falta
            Privado: this.contactFormModalPrivacy.value,
            IdDeporte: this.contactFormModalActivity.value,
            Kilometraje: 0, //falta
            Elevación: 0, //falta
            FechaFinal: this.contactFormModalDate.value,
            FechaInicial: this.contactFormModalDate.value,
            FondoAltitud: Number,
            Foto: null //falta
    };

        this.apievento.add(evento).subscribe(reply => {
          console.log(reply);
        });
    }

    /**
     * Acciones con la tabla
     */
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

    add() {
      if (this.awaitingPersonList.length > 0) {
        const person = this.awaitingPersonList[0];
        this.personList.push(person);
        this.awaitingPersonList.splice(0, 1);
      }
    }

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }

    get contactFormModalName() {
      return this.validatingForm.get('contactFormModalName');
    }
  
    get contactFormModalDate() {
      return this.validatingForm.get('contactFormModalDate');
    }
  
    get contactFormModalRoute() {
      return this.validatingForm.get('contactFormModalRoute');
    }
  
    get contactFormModalMessage() {
      return this.validatingForm.get('contactFormModalMessage');
    }

    get contactFormModalActivity() {
      return this.validatingForm.get('contactFormModalActivity');
    }

    get contactFormModalPrivacy() {
      return this.validatingForm.get('contactFormModalPrivacy');
    }

    get contactFormModalBankAccount() {
      return this.validatingForm.get('contactFormModalBankAccount');
    }

    get contactFormModalCategory() {
      return this.validatingForm.get('contactFormModalCategory');
    }

    get contactFormModalSponsors() {
      return this.validatingForm.get('contactFormModalSponsors');
    }
    
}