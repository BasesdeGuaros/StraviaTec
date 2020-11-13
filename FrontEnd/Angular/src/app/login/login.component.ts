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
      this.getUsuario();
  }

  validation(){
      this.apiusuarioRol.getUser(this.model.name).subscribe(reply => {
          console.log(reply);
          this.listUsuario = reply.data;
          console.log(this.listUsuario)
          if(this,this.listUsuario[0]==undefined){
              alert("Usuario o contrasena incorrectas")
              //cambiarlo por un modal
          }else{
              if(this.listUsuario[0].nombreUsuario == this.model.name && this.listUsuario[0].contraseña == this.model.password){
              this.router.navigate(['/lobby', this.model.name]);
              }
          }
      });
  }

  getUsuario(){
      
  }
  


}

