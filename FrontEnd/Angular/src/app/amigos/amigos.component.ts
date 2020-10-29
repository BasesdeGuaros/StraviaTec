import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.scss']
})
export class AmigosComponent implements OnInit {

  public friendsList = [
    {"name":"Daniel Garcia", "seguidores":244, "seguidos":312,"actividades":123},
    {"name":"Daniel Sing", "seguidores":345, "seguidos":298,"actividades":235},
    {"name":"Elias Arce", "seguidores":765, "seguidos":235,"actividades":983}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
