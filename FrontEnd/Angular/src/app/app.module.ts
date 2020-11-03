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
import { GroupsComponent } from './groups/groups.component';
import { RacingComponent } from './racing/racing.component';
import { ChallengingComponent } from './challenging/challenging.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { OrganizerRaceComponent } from './organizer-race/organizer-race.component';
import { OrganizerChallengeComponent } from './organizer-challenge/organizer-challenge.component';
import { OrganizerGroupComponent } from './organizer-group/organizer-group.component';
import { MisCarrerasRetosComponent } from './mis-carreras-retos/mis-carreras-retos.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LobbyComponent,
    AmigosComponent,
    GroupsComponent,
    RacingComponent,
    ChallengingComponent,
    OrganizerComponent,
    OrganizerRaceComponent,
    OrganizerChallengeComponent,
    OrganizerGroupComponent,
    MisCarrerasRetosComponent
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
      { path: 'friends', component: AmigosComponent},
      { path: 'race', component: RacingComponent},
      { path: "challenge", component: ChallengingComponent},
      { path: 'groups', component: GroupsComponent},
      { path: 'organizer', component: OrganizerComponent},
      { path: 'organizerRace', component: OrganizerRaceComponent},
      { path: 'organizerChallenge', component: OrganizerChallengeComponent},
      { path: 'organizerGroup', component: OrganizerGroupComponent},
      { path: 'miscarrerasretos', component: MisCarrerasRetosComponent}
    
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


