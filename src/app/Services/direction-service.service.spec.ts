import { TestBed } from '@angular/core/testing';

import { DirectionServiceService } from './direction-service.service';

describe('DirectionServiceService', () => {
  let service: DirectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
