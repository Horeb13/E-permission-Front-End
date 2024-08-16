import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanMatchFn } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard{
  constructor(private authService: AuthService, private router: Router) {}

  canMatch: CanMatchFn = () => {
    const isSuperAdmin = this.authService.isSuperAdmin();
    if (isSuperAdmin) {
      return true;
    } else {
      this.router.navigate(['/access-deny']);
      return false;
    }
  };
};
