import { TestBed } from '@angular/core/testing';
import { DraggingHelperService } from './dragging-helper.service';

describe('DraggingHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DraggingHelperService = TestBed.get(DraggingHelperService);
    expect(service).toBeTruthy();
  });
});
