import { inject, TestBed } from '@angular/core/testing';
import { AuthorisationGuard } from './authorisation-guard.service';

describe('AuthorisationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorisationGuard]
    });
  });

  it('should create', inject([AuthorisationGuard], (guard: AuthorisationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
