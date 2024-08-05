import { TestBed } from '@angular/core/testing';

import { DemandeDePermissionService } from './demande-de-permission.service';

describe('DemandeDePermissionService', () => {
  let service: DemandeDePermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeDePermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
