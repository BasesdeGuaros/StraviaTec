import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiusuariorolService } from "../services/apiusuariorol.service";

@Component({
  selector: "app-organizer",
  templateUrl: "./organizer.component.html",
  styleUrls: ["./organizer.component.scss"],
})
export class OrganizerComponent implements OnInit {
  public username = "";
  public cedula = 0;
  public listUser = [];

  constructor(
    private apiusuarioRol: ApiusuariorolService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Funcion que se llama al cargarse la pagina 
   */
  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get("username");
    this.getUser();
  }

  /**
   * Se dirije a la vista de las carreras del organizador
   */
  gotoRun() {
    this.router.navigate(["/organizerRace", this.cedula]);
  }

  /**
   * Se dirije a la vista de los retos del organizador
   */
  gotoChallenges() {
    this.router.navigate(["/organizerChallenge", this.cedula]);
  }

  /**
   * Se dirije a la vista del los grupos del organizador
   */
  gotoGroup() {
    this.router.navigate(["/organizerGroup", this.cedula]);
  }

  /**
   * Funcion que hace una solicitud a la base de datos
   * Para obtener los usuriarios donde el rol sea de administrador/organizador
   */
  getUser() {
    this.apiusuarioRol.getUser(this.username, "1").subscribe((reply) => {
      console.log(reply);
      this.listUser = reply.data;
      this.cedula = this.listUser[0].idUsuarioNavigation.cedula;
    });
  }
}
