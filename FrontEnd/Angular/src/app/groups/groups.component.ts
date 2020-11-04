import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  onOpen(event: any) {
    console.log(event);
  }
  constructor() { }
  groupsList = [
    {"name":"grupoSing","admin":"Sing","number":982},
    {"name":"grupoGarza","admin":"Garza","number":12314},
    {"name":"grupoElias","admin":"Elias","number":0}
  ]

  ngOnInit(): void {
  }


}


