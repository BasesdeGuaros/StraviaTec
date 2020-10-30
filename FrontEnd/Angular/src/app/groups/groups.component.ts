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

  ngOnInit(): void {
  }


}


