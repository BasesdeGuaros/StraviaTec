import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiusuariorolService } from '../services/apiusuariorol.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
    public username = '';
    public cedula = 0;
    public listUser = [];

  constructor(
      private apiusuarioRol: ApiusuariorolService,
      private route: ActivatedRoute


  ) { }

  ngOnInit(): void {
      this.username = this.route.snapshot.paramMap.get('username');

      this.getUser();
  }

  getUser(){
       this.apiusuarioRol.getUser(this.username, "1").subscribe(reply => {
          console.log(reply);
          this.listUser = reply.data;
          this.cedula = this.listUser[0].idUsuarioNavigation.cedula;
    });

  }

}
