import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ApiusuariorolService } from '../services/apiusuariorol.service';
import { ApiusuariosigueusuarioService} from '../services/apiusuariosigueusuario.service';
import { ApiusuarioService} from '../services/apiusuario.service';
import { ModalDirective } from 'angular-bootstrap-md';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  @ViewChild('frame') public basicModal: ModalDirective;

  validatingForm: FormGroup;
  public username = '';
  public cedula = 0;
  public edad:number = 0;
  modelUser:any = {};
  modelScan:any = {};
  public fname = "";
  public listfollowers = [];
  public listUser = [];
  public listFriends = [];
  


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
      private apiusuario: ApiusuarioService,
      private router: Router,
      private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
      this.username = this.route.snapshot.paramMap.get('username')
      
      this.getUser();
      this.getFollowers();


      this.validatingForm = new FormGroup({
      signupFormModalName: new FormControl('', Validators.required),
      signupFormModalLast: new FormControl('', Validators.required),
      signupFormModalNat: new FormControl('', Validators.required),
      signupFormModalBirth: new FormControl('', Validators.required),
      signupFormModalPhoto: new FormControl('', Validators.required),
      signupFormModalUser: new FormControl('', Validators.required),
      signupFormModalPassword: new FormControl('', Validators.required),
      friendModel: new FormControl('', Validators.required)

    });
    this.modelScan.name = this.fname;
    document.getElementById("foto").setAttribute("src", "https://i.pinimg.com/originals/e2/b8/2a/e2b82aded815e80351b929a77519adaa.jpg");

    
  }

  

  getUser(){
        this.apiusuarioRol.getUser(this.username, "1").subscribe(reply => {
        console.log(reply);
        this.listUser = reply.data;
        this.cedula = this.listUser[0].idUsuarioNavigation.cedula;

        this.modelUser.name = this.listUser[0].idUsuarioNavigation.nombre;
        this.modelUser.lastName = this.listUser[0].idUsuarioNavigation.apellido;
        this.modelUser.nat = this.listUser[0].idUsuarioNavigation.nacionalidad;
        this.modelUser.birth = this.listUser[0].idUsuarioNavigation.fechaNacimiento;
        this.modelUser.photo = this.listUser[0].idUsuarioNavigation.foto;
        this.modelUser.userName = this.listUser[0].idUsuarioNavigation.nombreUsuario;
        this.modelUser.password = this.listUser[0].idUsuarioNavigation.contraseña;

        this.calcEdad();

    
          //document.getElementById("foto").setAttribute("src","data:image/png;base64," + this.listUser[0].idUsuarioNavigation.foto);

    });

  }



  getFollowers(){
      this.apiusuariosigueusuario.getUser(this.username).subscribe(reply => {
          console.log(reply);
          this.listfollowers = reply.data;
    });
  }



updateList() {
    
    // Editando la lista de usuario para enviarala al backend

      this.listUser[0].idUsuarioNavigation.nombre = this.modelUser.name;
      this.listUser[0].idUsuarioNavigation.apellido = this.modelUser.lastName;
      this.listUser[0].idUsuarioNavigation.nacionalidad = this.modelUser.nat;
      this.listUser[0].idUsuarioNavigation.fechaNacimiento = this.modelUser.birth;
      this.listUser[0].idUsuarioNavigation.foto = this.modelUser.photo;
      this.listUser[0].idUsuarioNavigation.nombreUsuario = this.modelUser.userName;
      this.listUser[0].idUsuarioNavigation.contraseña = this.modelUser.password;

      console.log(this.listUser[0]);
      

      this.apiusuarioRol.edit(this.listUser[0]).subscribe(reply => {
          console.log(reply);
        });

      console.log(this.listUser[0]); 
    }

    getFriends(){
        console.log("FRIENDS LIST");
        console.log("FOR " + this.friendModel.value);
        
        //console.log("FOR " + this.modelScan.name);
        if(this.friendModel.value != ""){
            this.apiusuarioRol.getFriend(this.friendModel.value).subscribe(reply => {
          console.log(reply);
          this.listFriends = reply.data;
        });

        this.basicModal.show();
        }
      
  }

  
    

 
  get signupFormModalName() {
    return this.validatingForm.get('signupFormModalName');
  }

  get signupFormModalLast() {
    return this.validatingForm.get('signupFormModalLast');
  }

  get signupFormModalNat() {
    return this.validatingForm.get('signupFormModalNat');
  }

  get signupFormModalPhoto() {
    return this.validatingForm.get('signupFormModalPhoto');
  }

  get signupFormModalUser() {
    return this.validatingForm.get('signupFormModalUser');
  }

  get signupFormModalBirth() {
    return this.validatingForm.get('signupFormModalBirth');
  }


  get signupFormModalPassword() {
    return this.validatingForm.get('signupFormModalPassword');
  }

  get friendModel() {
    return this.validatingForm.get('friendModel');
  }


calcEdad(){

    var currentTime = new Date();
        this.edad = currentTime.getFullYear() - parseInt( this.modelUser.birth.substring(0,4));
        if(currentTime.getMonth() >= parseInt( this.modelUser.birth.substring(5,7))){
        
            if(currentTime.getDay() >=  parseInt( this.modelUser.birth.substring(8,10))){
                this.edad += 1;
            }

        }
}

}


