import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ApiparticipacionusuariogrupoService } from "../services/apiparticipacionusuariogrupo.service";
import { Grupo } from "../Models/Grupo";

@Component({
  selector: "app-organizer-group",
  templateUrl: "./organizer-group.component.html",
  styleUrls: ["./organizer-group.component.scss"],
})
export class OrganizerGroupComponent implements OnInit {
  public cedula = "";
  public listGroup = [];
  public gruposize = [];

  editField: string;
  validatingForm: FormGroup;

  constructor(
    private apiGrupo: ApiparticipacionusuariogrupoService,
    private route: ActivatedRoute
  ) {}

  /**
   * Funcion que se llama al cargarse la pagina 
   */
  ngOnInit(): void {
    this.cedula = this.route.snapshot.paramMap.get("cedula");
    this.getGruop();

    this.validatingForm = new FormGroup({
      subscriptionFormModalName: new FormControl("", Validators.required),
      subscriptionFormModalEmail: new FormControl("", Validators.required),
    });
  }

  /**
   * Funcion para obtener los grupos que perteneces al organizador que accedio a la pagina web
   */
  getGruop() {
    this.apiGrupo.getGroup(this.cedula).subscribe((reply) => {
      console.log(reply);
      this.listGroup = reply.data;

      var i;
      for (i = 0; i < this.listGroup.length; i++) {
        this.apiGrupo
          .getGroupParticipants(this.cedula, this.listGroup[i].idGrupo)
          .subscribe((reply) => {
            console.log(reply);
            this.gruposize.push(reply.data);
          });
      }
    });
  }

  /**
   * Añadir un nuevo grupo, donde el administrador es el mismo organizador que realiza la pediticion
   */
  addGruop() {
    const grupo: Grupo = {
      Id: 5,
      Nombre: this.subscriptionFormModalName.value,
    };

    this.apiGrupo.add(grupo, "1", this.cedula).subscribe((reply) => {
      console.log(reply);
    });
  }

  /**
   * Se utiliza una tabla editable dentro de la vista para darle una herramienta de facil uso al usuario
   * Cuando se detecta un cambio dentro de la tabla, se le reporta a la base de datos para que modifique los valores
   * @param id 
   * @param direc 
   * @param property 
   * @param event 
   */
  updateList(id: number, direc: string, property: string, event: any) {
    const editField = event.target.textContent;
    this.listGroup[id][direc][property] = editField;

    this.apiGrupo.edit(this.listGroup[id]).subscribe((reply) => {
      console.log(reply);
    });
  }

  /**
   * Funcion para eliminar una fila de la tabla editable
   * @param id indice donde se encuentra la fila a eliminar
   */
  remove(id: any) {
    console.log(this.listGroup[id]);
    this.apiGrupo
      .delete(this.listGroup[id].idGrupo, this.cedula)
      .subscribe((reply) => {
        console.log(reply);
      });
  }

  /**
   * Metodos get para returnar el valor dentro de los modals
   */
  get subscriptionFormModalName() {
    return this.validatingForm.get("subscriptionFormModalName");
  }

  get subscriptionFormModalEmail() {
    return this.validatingForm.get("subscriptionFormModalEmail");
  }
}
