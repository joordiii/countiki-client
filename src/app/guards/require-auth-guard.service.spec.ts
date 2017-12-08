import { TestBed, inject } from '@angular/core/testing';

import { RequireAuthGuardService } from './require-auth-guard.service';

describe('RequireAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequireAuthGuardService]
    });
  });

  it('should be created', inject([RequireAuthGuardService], (service: RequireAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
