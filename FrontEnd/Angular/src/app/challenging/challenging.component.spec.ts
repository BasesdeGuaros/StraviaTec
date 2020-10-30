import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengingComponent } from './challenging.component';

describe('ChallengingComponent', () => {
  let component: ChallengingComponent;
  let fixture: ComponentFixture<ChallengingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
