import { TestBed } from '@angular/core/testing';

import { TypeDePermissionServiceService } from './type-de-permission-service.service';

describe('TypeDePermissionServiceService', () => {
  let service: TypeDePermissionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDePermissionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
