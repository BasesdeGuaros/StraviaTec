import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-racing',
  templateUrl: './racing.component.html',
  styleUrls: ['./racing.component.scss']
})
export class RacingComponent implements OnInit {
  validatingForm: FormGroup;

  constructor() { }

  races = [{"name":"Carrera CE","descript":"description of ce carrier"},
  {"name":"Amazing Race","descript":"amazing race its the better"},
  {"name":"Carrera Garza","descript":"fuck daniel sing and elias are gays"}]

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      voucher: new FormControl('', Validators.required)
    });
  }
  

  get voucher() {
    return this.validatingForm.get('voucher');
  }

  
}



