import { Component, OnInit } from '@angular/core';
import { ApiusuarioService } from '../services/apiusuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public listUsuarios = [];

  constructor(
      private apiusuario: ApiusuarioService
  ) { }

  ngOnInit(): void {
      this.getUsuario();
  }

  getUsuario(){
      this.apiusuario.getUser().subscribe(reply => {
          console.log(reply);
          this.listUsuarios = reply.data;
      });
  }
  


}

