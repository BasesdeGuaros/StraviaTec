import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ApiusuariorolService } from '../services/apiusuariorol.service';
import { ApiusuariosigueusuarioService} from '../services/apiusuariosigueusuario.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  validatingForm: FormGroup;
  public listfollowers = [];
  public listUser = [];

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

  public friendsList = [
    {"name":"Daniel Garcia", "seguidores":244, "seguidos":312,"actividades":123},
    {"name":"Daniel Sing", "seguidores":345, "seguidos":298,"actividades":235},
    {"name":"Elias Arce", "seguidores":0, "seguidos":235,"actividades":0}
  ];

  constructor(
      private apiusuarioRol: ApiusuariorolService,
      private apiusuariosigueusuario: ApiusuariosigueusuarioService,
      private router: Router,
      private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
      
      this.getUser();
      this.getFollowers();
      this.validatingForm = new FormGroup({
      signupFormModalName: new FormControl('', Validators.required),
      signupFormModalEmail: new FormControl('', Validators.email),
      signupFormModalPassword: new FormControl('', Validators.required),
    });
    
  }


  getUser(){
       this.apiusuarioRol.getUser(this.route.snapshot.paramMap.get('username')).subscribe(reply => {
          console.log(reply);
          this.listUser = reply.data;
    });

  }

  getFollowers(){
      this.apiusuariosigueusuario.getUser(this.route.snapshot.paramMap.get('username')).subscribe(reply => {
          console.log(reply);
          this.listfollowers = reply.data;
    });
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


