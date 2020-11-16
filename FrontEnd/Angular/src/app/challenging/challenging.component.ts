import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ApieventotienetipoService } from '../services/apieventotienetipo.service';

@Component({
  selector: 'app-challenging',
  templateUrl: './challenging.component.html',
  styleUrls: ['./challenging.component.scss']
})
export class ChallengingComponent implements OnInit {
  validatingForm: FormGroup;
  public listChallange = [];

  constructor(
      private apiEventoTieneTipo: ApieventotienetipoService
  ) { }

  
  challenges = [{"name":"Carrera CE","descript":"description of ce carrier"},
  {"name":"Amazing Race","descript":"amazing race its the better"},
  {"name":"Carrera Garza","descript":"fuck daniel sing and elias are gays"}]

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

}


