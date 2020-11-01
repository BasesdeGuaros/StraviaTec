import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerRaceComponent } from './organizer-race.component';

describe('OrganizerRaceComponent', () => {
  let component: OrganizerRaceComponent;
  let fixture: ComponentFixture<OrganizerRaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerRaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
