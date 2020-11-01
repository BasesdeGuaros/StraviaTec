import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerGroupComponent } from './organizer-group.component';

describe('OrganizerGroupComponent', () => {
  let component: OrganizerGroupComponent;
  let fixture: ComponentFixture<OrganizerGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
