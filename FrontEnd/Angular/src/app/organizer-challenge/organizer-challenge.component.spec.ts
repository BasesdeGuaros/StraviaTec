import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerChallengeComponent } from './organizer-challenge.component';

describe('OrganizerChallengeComponent', () => {
  let component: OrganizerChallengeComponent;
  let fixture: ComponentFixture<OrganizerChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerChallengeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
