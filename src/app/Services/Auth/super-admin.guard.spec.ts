import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { superAdminGuard } from './super-admin.guard';

describe('superAdminGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => superAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
