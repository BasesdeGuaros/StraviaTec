import { TestBed } from '@angular/core/testing';

import { ApiusuariorolService } from './apiusuariorol.service';

describe('ApiusuariorolService', () => {
  let service: ApiusuariorolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiusuariorolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
