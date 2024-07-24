import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../Services/Auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  currentUser: any;

  constructor(private authService: AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentuser') || '{}');
  }

  logout() {
    this.authService.logout();
  }

}
