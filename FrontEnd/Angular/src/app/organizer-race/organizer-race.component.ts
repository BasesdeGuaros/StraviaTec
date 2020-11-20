import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ApieventotienetipoService } from "../services/apieventotienetipo.service";
import { Evento } from "../Models/Evento";
import { Patrocinador } from "../Models/Patrocinador";
import { ApisubscripcionesService } from "../services/apisubscripciones.service";
import { ModalDirective } from "angular-bootstrap-md";
import { ApieventopatrocinadopatrocinadorService } from "../services/apieventopatrocinadopatrocinador.service";

@Component({
  selector: "app-organizer-race",
  templateUrl: "./organizer-race.component.html",
  styleUrls: ["./organizer-race.component.scss"],
})
export class OrganizerRaceComponent implements OnInit {
  public cedula = "";
  public listEvent = [];
  public listSubs = [];
  public listSponsor = [];
  public listSport = [];
  public listPrivacy = [];
  public listCategory = [];
  public modal;
  public deporte = "";
  @ViewChild("basicModal") public basicModal: ModalDirective;
  @ViewChild("SponsorModal") public SponsorModal: ModalDirective;

  editField: string;
  validatingForm: FormGroup;

  constructor(
    private apievento: ApieventotienetipoService,
    private apiSubscripciones: ApisubscripcionesService,
    private apiPatrocinadores: ApieventopatrocinadopatrocinadorService,
    private route: ActivatedRoute
  ) {}

  /**
   * Agrega un nuevo evento a partir del un pop-up (modal)
   */
  ngOnInit(): void {
    this.cedula = this.route.snapshot.paramMap.get("cedula");
    this.getEvent();

    //Validacion del form
    this.validatingForm = new FormGroup({
      contactFormModalName: new FormControl("", Validators.required),
      contactFormModalDate: new FormControl("", Validators.required),
      contactFormModalRoute: new FormControl("", Validators.required),
      contactFormModalActivity: new FormControl("", Validators.required),
      contactFormModalPrivacy: new FormControl("", Validators.required),
      contactFormModalBankAccount: new FormControl("", Validators.required),
      contactFormModalCategory: new FormControl("", Validators.required),
      contactFormModalSponsors: new FormControl("", Validators.required),
      contactFormModalPrice: new FormControl("", Validators.required),
      contactFormModalDistance: new FormControl("", Validators.required),
      contactFormModalSponsorName: new FormControl("", Validators.required),
      contactFormModalSponsorLogo: new FormControl("", Validators.required),
      contactFormModalSponsorNumber: new FormControl("", Validators.required),
      contactFormModalSponsorRepresentative: new FormControl(
        "",
        Validators.required
      ),
    });
  }

  /**
   * Obtiene los patrocinadores de un evento en especifico
   * @param i indice del evento para obtener los patrocinadores
   */
  getSponsors(i) {
    var id = this.listEvent[i].idEvento;
    id = id.toString();
    this.apiPatrocinadores.getSponsor(id).subscribe((reply) => {
      console.log(reply);
      this.listSponsor = reply.data;
    });

    if (this.listSponsor.length == 0) {
      alert("no hay patrocinadores para este evento");
    } else {
      this.SponsorModal.show();
    }
  }

  /**
   * Obtiene los subscriptores de un evento en especifico
   * @param i indice del evento para obtener los subscritores
   */
  getSubs(i) {
    this.apiSubscripciones
      .getSubs(this.cedula, this.listEvent[i].idEvento)
      .subscribe((reply) => {
        console.log(reply);
        this.listSubs = reply.data;
      });

    if (this.listSubs.length == 0) {
      alert("no hay subscripciones para este evento");
    } else {
      this.basicModal.show();
    }
  }

  /**
   * Obtiene los eventos que son propios del organizador que accede a la pagina
   * Clasifica varios atributos para darle una mejor vista al organizador
   */
  getEvent() {
    this.apievento.getEventType(this.cedula, "1").subscribe((reply) => {
      console.log(reply);
      this.listEvent = reply.data;

      var i;
      for (i = 0; i < this.listEvent.length; i++) {
        console.log(this.listEvent[i].idEventoNavigation.idDeporte);
        if (this.listEvent[i].idEventoNavigation.idDeporte == 1) {
          this.listSport.push("Atletismo");
        } else if (this.listEvent[i].idEventoNavigation.idDeporte == 2) {
          this.listSport.push("Natacion");
        } else if (this.listEvent[i].idEventoNavigation.idDeporte == 3) {
          this.listSport.push("Ciclismo");
        } else if (this.listEvent[i].idEventoNavigation.idDeporte == 4) {
          this.listSport.push("Senderismo");
        } else if (this.listEvent[i].idEventoNavigation.idDeporte == 5) {
          this.listSport.push("Kayak");
        } else if (this.listEvent[i].idEventoNavigation.idDeporte == 6) {
          this.listSport.push("Caminata");
        }
      }
      var i;
      for (i = 0; i < this.listEvent.length; i++) {
        if (this.listEvent[i].idEventoNavigation.privado == 1) {
          this.listPrivacy.push("Privado");
        } else if (this.listEvent[i].idEventoNavigation.privado == 2) {
          this.listPrivacy.push("Publico");
        }
      }

      var i;
      for (i = 0; i < this.listEvent.length; i++) {
        if (this.listEvent[i].idEventoNavigation.categoria == 1) {
          this.listCategory.push("Junior");
        } else if (this.listEvent[i].idEventoNavigation.categoria == 2) {
          this.listCategory.push("Sub-23");
        } else if (this.listEvent[i].idEventoNavigation.categoria == 3) {
          this.listCategory.push("Open");
        } else if (this.listEvent[i].idEventoNavigation.categoria == 4) {
          this.listCategory.push("Elite");
        } else if (this.listEvent[i].idEventoNavigation.categoria == 5) {
          this.listCategory.push("Master A");
        } else if (this.listEvent[i].idEventoNavigation.categoria == 6) {
          this.listCategory.push("Master B");
        } else if (this.listEvent[i].idEventoNavigation.categoria == 7) {
          this.listCategory.push("Master C");
        }
      }
    });
  }
  
  /**
   * Agrega un nuevo evento a partir del un pop-up (modal)
   */
  addEvent() {
    const evento: Evento = {
      Nombre: this.contactFormModalName.value,
      Fecha: this.contactFormModalDate.value,
      IdAdmin: this.cedula,
      Recorrido: "no tiene", //this.contactFormModalRoute.value, FALTA
      Cuenta: this.contactFormModalBankAccount.value,
      Categoria: this.contactFormModalCategory.value,
      Costo: this.contactFormModalPrice.value,
      Privado: this.contactFormModalPrivacy.value,
      IdDeporte: this.contactFormModalActivity.value,
      Kilometraje: this.contactFormModalDistance.value,
      Elevación: Number,
      FechaFinal: this.contactFormModalDate.value,
      FechaInicial: this.contactFormModalDate.value,
      FondoAltitud: Number,
      Foto: null, //falta
    };

    this.apievento.add(evento, "1").subscribe((reply) => {
      console.log(reply);

      const patrocinador: Patrocinador = {
        Id: Number,
        Logo: this.contactFormModalSponsorLogo.value,
        Nombre: this.contactFormModalSponsorName.value,
        Numero: this.contactFormModalSponsorNumber.value,
        Representante: this.contactFormModalSponsorRepresentative.value,
      };
      this.apiPatrocinadores.addSponsor(patrocinador).subscribe((reply) => {
        console.log(reply);
        this.listSponsor = reply.data;
      });
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
    this.listEvent[id][direc][property] = editField;

    this.apievento.edit(this.listEvent[id]).subscribe((reply) => {
      console.log(reply);
    });

    console.log(this.listEvent[id]);
  }

  /**
   * Funcion para eliminar una fila de la tabla editable
   * @param id indice donde se encuentra la fila a eliminar
   */
  remove(id: any) {
    this.apievento
      .delete(this.listEvent[id].idEvento, this.listEvent[id].idTipoEvento)
      .subscribe((reply) => {
        console.log(reply);
      });
  }

  /**
   * Metodos get para returnar el valor dentro de los modals
   */
  get contactFormModalName() {
    return this.validatingForm.get("contactFormModalName");
  }

  get contactFormModalDate() {
    return this.validatingForm.get("contactFormModalDate");
  }

  get contactFormModalRoute() {
    return this.validatingForm.get("contactFormModalRoute");
  }

  get contactFormModalMessage() {
    return this.validatingForm.get("contactFormModalMessage");
  }

  get contactFormModalActivity() {
    return this.validatingForm.get("contactFormModalActivity");
  }

  get contactFormModalPrivacy() {
    return this.validatingForm.get("contactFormModalPrivacy");
  }

  get contactFormModalBankAccount() {
    return this.validatingForm.get("contactFormModalBankAccount");
  }

  get contactFormModalCategory() {
    return this.validatingForm.get("contactFormModalCategory");
  }

  get contactFormModalSponsors() {
    return this.validatingForm.get("contactFormModalSponsors");
  }

  get contactFormModalPrice() {
    return this.validatingForm.get("contactFormModalPrice");
  }

  get contactFormModalDistance() {
    return this.validatingForm.get("contactFormModalDistance");
  }

  get contactFormModalSponsorName() {
    return this.validatingForm.get("contactFormModalSponsorName");
  }

  get contactFormModalSponsorLogo() {
    return this.validatingForm.get("contactFormModalSponsorLogo");
  }

  get contactFormModalSponsorNumber() {
    return this.validatingForm.get("contactFormModalSponsorNumber");
  }

  get contactFormModalSponsorRepresentative() {
    return this.validatingForm.get("contactFormModalSponsorRepresentative");
  }
}
