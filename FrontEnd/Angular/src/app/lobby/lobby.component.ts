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
  public username = '';
  public cedula = 0;
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
      this. username = this.route.snapshot.paramMap.get('username')
      this.getUser();
      this.getFollowers();


      this.validatingForm = new FormGroup({
      signupFormModalName: new FormControl('', Validators.required),
      signupFormModalEmail: new FormControl('', Validators.email),
      signupFormModalPassword: new FormControl('', Validators.required),
    });

    document.getElementById("photo").setAttribute("src", "https://i.pinimg.com/originals/e2/b8/2a/e2b82aded815e80351b929a77519adaa.jpg");

    
  }

  


  getUser(){
       this.apiusuarioRol.getUser(this.username, "2").subscribe(reply => {
          console.log(reply);
          this.listUser = reply.data;
          this.cedula = this.listUser[0].idUsuarioNavigation.cedula;
          
          
          document.getElementById("foto").setAttribute("src","data:image/png;base64," + this.listUser[0].idUsuarioNavigation.foto);

    });

  }

  getFollowers(){
      this.apiusuariosigueusuario.getUser(this.username).subscribe(reply => {
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


