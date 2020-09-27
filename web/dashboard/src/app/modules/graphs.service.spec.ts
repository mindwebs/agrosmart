import { TestBed } from '@angular/core/testing';

import { GraphsService } from './graphs.service';

describe('GraphsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphsService = TestBed.get(GraphsService);
    expect(service).toBeTruthy();
  });
});
