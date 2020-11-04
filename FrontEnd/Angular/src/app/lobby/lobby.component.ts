import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  validatingForm: FormGroup;

  groupsList = [
    {"name":"Sing","admin":"Sing","number":982},
    {"name":"Garza","admin":"Garza","number":12314},
    {"name":"Elias","admin":"Elias","number":0},
    {"name":"Johnny","admin":"Elias","number":0},
    {"name":"MARKO","admin":"Elias","number":0},
    {"name":"Mierda","admin":"Elias","number":0},
    {"name":"SQL","admin":"Elias","number":0},
    {"name":"HOLA","admin":"Elias","number":0},
    {"name":"ADIOS","admin":"Elias","number":0},
    {"name":"F","admin":"Elias","number":0}
  ]




  constructor() { }
  
  ngOnInit(): void {

    this.validatingForm = new FormGroup({
      signupFormModalName: new FormControl('', Validators.required),
      signupFormModalEmail: new FormControl('', Validators.email),
      signupFormModalPassword: new FormControl('', Validators.required),
    });
    
      
    this.function();

  }
 
  public function(){
    
    const countries = [
      {name: 'USA'},
      {name: 'India'},
      {name: 'Argentina'},
      {name: 'Armenia'}
    ];
    
    
    const searchInput = document.querySelector('.search-input');
    const suggestionsPanel = document.querySelector('.suggestions');
    
    searchInput.addEventListener('keyup', function() {
    
      const input = searchInput.value;
      suggestionsPanel.innerHTML = '';
      const suggestions = countries.filter(function(country) {
        return country.name.toLowerCase().startsWith(input);
      });
      suggestions.forEach(function(suggested) {
        const div = document.createElement('div');
        div.innerHTML = suggested.name;
        suggestionsPanel.appendChild(div);
      });
      if (input === '') {
        suggestionsPanel.innerHTML = '';  
      }
    })
  }



  get signupFormModalName() {
    return this.validatingForm.get('signupFormModalName');
  }

  get signupFormModalEmail() {
    return this.validatingForm.get('signupFormModalEmail');
  }

  get signupFormModalPassword() {
    return this.validatingForm.get('signupFormModalPassword');
  }

  

}


