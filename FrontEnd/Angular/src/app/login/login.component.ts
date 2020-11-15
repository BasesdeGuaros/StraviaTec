import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiusuariorolService } from '../services/apiusuariorol.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public listUsuario = [];
    model: any = {};


  constructor(
      private apiusuarioRol: ApiusuariorolService,
      private router: Router,

  ) { }

  ngOnInit(): void {
  }

  validation(){
      this.apiusuarioRol.getUser(this.model.name).subscribe(reply => {
          console.log(reply);
          this.listUsuario = reply.data;
          if(this,this.listUsuario[0] == undefined){
              alert("Usuario o contrasena incorrectas")
              //cambiarlo por un modal
          }else{
              if(this.listUsuario[0].idUsuarioNavigation.nombreUsuario == this.model.name && this.listUsuario[0].idUsuarioNavigation.contraseña == this.model.password){
                  if(this.listUsuario[0].idRol){
                      this.router.navigate(['/lobby', this.model.name]);
                  }else{
                      this.router.navigate(['/organizer']);
                  }
              }
          }
      });
  }

  


}

