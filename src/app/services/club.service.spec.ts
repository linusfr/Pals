import { TestBed } from '@angular/core/testing';

import { ClubService } from './club.service';
import { HttpClientModule } from '@angular/common/http';

describe('ResolversService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
  );

  it('should be created', () => {
    const service: ClubService = TestBed.get(ClubService);
    expect(service).toBeTruthy();
  });
});
