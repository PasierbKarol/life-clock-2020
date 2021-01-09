import { TestBed } from '@angular/core/testing';
import { GoalsProviderService } from './goals-provider.service';

describe('GoalsProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoalsProviderService = TestBed.get(GoalsProviderService);
    expect(service).toBeTruthy();
  });
});
