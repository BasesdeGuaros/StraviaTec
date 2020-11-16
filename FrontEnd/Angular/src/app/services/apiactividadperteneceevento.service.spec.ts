import { TestBed } from '@angular/core/testing';

import { ApiactividadperteneceeventoService } from './apiactividadperteneceevento.service';

describe('ApiactividadperteneceeventoService', () => {
  let service: ApiactividadperteneceeventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiactividadperteneceeventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
