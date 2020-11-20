import { Component, OnInit } from '@angular/core';
import { ApiparticipacionusuariogrupoService } from '../services/apiparticipacionusuariogrupo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
    public cedula = '';
    public listGroup = [];

  onOpen(event: any) {
    console.log(event);
  }

  constructor(
      private apiGroup: ApiparticipacionusuariogrupoService,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

      this.cedula = this.route.snapshot.paramMap.get('cedula');
  }

  getGruop(){
       this.apiGroup.getGroup(this.cedula).subscribe(reply => {
          console.log(reply);
          this.listGroup = reply.data;
        });
    }


}


