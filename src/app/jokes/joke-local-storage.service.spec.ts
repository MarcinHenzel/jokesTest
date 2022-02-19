import { TestBed } from '@angular/core/testing';

import { JokeLocalStorageService } from './joke-local-storage.service';

describe('JokeLocalStorageService', () => {
  let service: JokeLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JokeLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
