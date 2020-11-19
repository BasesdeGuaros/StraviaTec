import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ApiparticipacionusuariogrupoService } from '../services/apiparticipacionusuariogrupo.service';
import { Grupo } from '../Models/Grupo'



@Component({
  selector: 'app-organizer-group',
  templateUrl: './organizer-group.component.html',
  styleUrls: ['./organizer-group.component.scss']
})
export class OrganizerGroupComponent implements OnInit {
    public cedula = '';
    public listGroup = [];


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
      private apiGrupo: ApiparticipacionusuariogrupoService,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
      this.cedula = this.route.snapshot.paramMap.get('cedula');
      this.getGruop();


    this.validatingForm = new FormGroup({
      subscriptionFormModalName: new FormControl('', Validators.required),
      subscriptionFormModalEmail: new FormControl('', Validators.required)
    });
  }
  


    getGruop(){
       this.apiGrupo.getGroup(this.cedula).subscribe(reply => {
          console.log(reply);
          this.listGroup = reply.data;
        });
    }


    addGruop(){

        const grupo: Grupo  = {
            Id: 5,
            Nombre: this.subscriptionFormModalName.value
    };


        this.apiGrupo.add(grupo,"1",this.cedula).subscribe(reply => {
          console.log(reply);
        });
    }
    

  updateList(id: number, direc: string, property: string, event: any) {
      const editField = event.target.textContent;
      this.listGroup[id][direc][property] = editField;

      this.apiGrupo.edit(this.listGroup[id]).subscribe(reply => {
          console.log(reply);
        });
    }

  remove(id: any) {
        console.log(this.listGroup[id]);
        this.apiGrupo.delete(this.listGroup[id].idGrupo, this.cedula).subscribe(reply => {
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

  get subscriptionFormModalName() {
    return this.validatingForm.get('subscriptionFormModalName');
  }

  get subscriptionFormModalEmail() {
    return this.validatingForm.get('subscriptionFormModalEmail');
  }

}
