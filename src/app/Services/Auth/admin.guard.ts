import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanMatchFn } from '@angular/router';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class AdminGuard{
  constructor(private authService: AuthService, private router: Router) {}

  canMatch: CanMatchFn = () => {
    const isAdmin = this.authService.isAdmin();
    if (isAdmin) {
      return true;
    } else {
      this.router.navigate(['/access-deny']);
      return false;
    }
  };
}
