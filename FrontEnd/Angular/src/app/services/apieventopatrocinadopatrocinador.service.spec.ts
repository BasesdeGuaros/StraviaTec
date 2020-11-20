import { TestBed } from '@angular/core/testing';

import { ApieventopatrocinadopatrocinadorService } from './apieventopatrocinadopatrocinador.service';

describe('ApieventopatrocinadopatrocinadorService', () => {
  let service: ApieventopatrocinadopatrocinadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApieventopatrocinadopatrocinadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
