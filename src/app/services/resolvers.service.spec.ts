import { TestBed } from '@angular/core/testing';

import { ResolversService } from './resolvers.service';

describe('ResolversService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResolversService = TestBed.get(ResolversService);
    expect(service).toBeTruthy();
  });
});
