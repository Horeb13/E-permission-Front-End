
import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../Services/Auth/auth.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-role-selection',
  standalone : true,
  templateUrl : './role-selection.component.html',
  imports:[CommonModule, ButtonModule, RippleModule]
})
export class RoleSelectionComponent {
  roles: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.roles = this.authService.getUserRoles(); // Récupère les rôles de l'utilisateur
  }

  selectRole(role: any): void {
    this.authService.setActiveRole(role); // Stocke le rôle actif
    this.router.navigate(['/home']); // Redirige vers la page d'accueil
  }
}
