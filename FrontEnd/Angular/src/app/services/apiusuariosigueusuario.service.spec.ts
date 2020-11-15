import { TestBed } from '@angular/core/testing';

import { ApiusuariosigueusuarioService } from './apiusuariosigueusuario.service';

describe('ApiusuariosigueusuarioService', () => {
  let service: ApiusuariosigueusuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiusuariosigueusuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
