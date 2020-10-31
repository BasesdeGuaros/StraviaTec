import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  validatingForm: FormGroup;
  


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


