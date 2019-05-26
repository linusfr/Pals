import { TestBed } from '@angular/core/testing';

import { CometChatApiService } from './comet-chat-api.service';

describe('CometChatApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CometChatApiService = TestBed.get(CometChatApiService);
    expect(service).toBeTruthy();
  });
});
