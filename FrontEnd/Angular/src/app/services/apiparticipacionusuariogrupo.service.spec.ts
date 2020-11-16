import { TestBed } from '@angular/core/testing';

import { ApiparticipacionusuariogrupoService } from './apiparticipacionusuariogrupo.service';

describe('ApiparticipacionusuariogrupoService', () => {
  let service: ApiparticipacionusuariogrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiparticipacionusuariogrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
