import { Component, OnInit } from '@angular/core';
import { ApiparticipacionusuariogrupoService } from '../services/apiparticipacionusuariogrupo.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
    public listGroup = [];

  onOpen(event: any) {
    console.log(event);
  }

  constructor(
      private apiGroup: ApiparticipacionusuariogrupoService
  ) { }


  groupsList = [
    {"name":"grupoSing","admin":"Sing","number":982},
    {"name":"grupoGarza","admin":"Garza","number":12314},
    {"name":"grupoElias","admin":"Elias","number":0}
  ]


  ngOnInit(): void {
      this.getGroup();
  }

  getGroup(){
      this.apiGroup.getGroup().subscribe(reply => { 
          console.log(reply);
          this.listGroup = reply.data;
          console.log(this.listGroup.length);
      });
      
  }


}


