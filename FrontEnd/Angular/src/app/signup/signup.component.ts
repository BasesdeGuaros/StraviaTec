import { Component, OnInit } from '@angular/core';
import { ApiusuariorolService } from '../services/apiusuariorol.service';
import { UsurioRol } from '../Models/UsuarioRol'
import { reply } from '../Models/reply'



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    public listUsuarios = [];


  constructor(
    private apiusuarioRol: ApiusuariorolService
  ) { }

  optionsSelect: Array<any>;
  ngOnInit() {

      this.getUsuario();

    this.optionsSelect = [
      { value: 'Feedback', label: 'Feedback' },
      { value: 'Report a bug', label: 'Report a bug' },
      { value: 'Feature request', label: 'Feature request' },
      { value: 'Other stuff', label: 'Other stuff' },
    ];
  }

    getUsuario(){
      this.apiusuarioRol.getUser().subscribe(reply => {
          console.log(reply);
          this.listUsuarios = reply.data;
      });
  }

  add()
  {
      const UsuarioRol: UsurioRol = {

        IdUsuario: 1,
        IdRol: 1,

        IdRolNavigation: {
            Id: 1,
            Nombre: 'Deportista'
        },
        IdUsuarioNavigation: {
            cedula: 1,
            nombre: 'Marco',
            apellido: 'Rivera',
            nombreUsuario: 'mrivera',
            contraseña: 'marco',
            nacionalidad: 'tico',
            fechaNacimiento: '1980-06-11',
    }
      };


      this.apiusuarioRol.add(UsuarioRol).subscribe(reply => {
          console.log(reply);
          console.log(reply.message);
      })
  }

}




