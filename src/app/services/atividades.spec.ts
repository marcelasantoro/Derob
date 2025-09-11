import { TestBed } from '@angular/core/testing';

import { Atividades } from './atividades.service';

describe('Atividades', () => {
  let service: Atividades;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Atividades);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
