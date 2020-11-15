import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ApieventotienetipoService } from '../services/apieventotienetipo.service';



@Component({
  selector: 'app-racing',
  templateUrl: './racing.component.html',
  styleUrls: ['./racing.component.scss']
})
export class RacingComponent implements OnInit {
  validatingForm: FormGroup;
  public listRace = [];

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

  
}



