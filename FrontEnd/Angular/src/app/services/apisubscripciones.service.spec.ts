import { TestBed } from '@angular/core/testing';

import { ApisubscripcionesService } from './apisubscripciones.service';

describe('ApisubscripcionesService', () => {
  let service: ApisubscripcionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApisubscripcionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
