import { TestBed } from '@angular/core/testing';

import { QueryService } from './queries.service';

describe('ResolversService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueryService = TestBed.get(QueryService);
    expect(service).toBeTruthy();
  });
});
