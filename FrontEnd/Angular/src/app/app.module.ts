import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ConnectionServiceModule} from 'ng-connection-service';


import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LobbyComponent } from './lobby/lobby.component';
import { AmigosComponent } from './amigos/amigos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LobbyComponent,
    AmigosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ConnectionServiceModule,
    FormsModule,
    ReactiveFormsModule,
    

    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'signup', component: SignupComponent},
      { path: 'lobby', component: LobbyComponent},
      { path: 'friends', component: AmigosComponent}
    
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


