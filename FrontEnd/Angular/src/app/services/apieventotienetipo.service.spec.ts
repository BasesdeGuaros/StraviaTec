import { TestBed } from '@angular/core/testing';

import { ApieventotienetipoService } from './apieventotienetipo.service';

describe('ApieventotienetipoService', () => {
  let service: ApieventotienetipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApieventotienetipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
