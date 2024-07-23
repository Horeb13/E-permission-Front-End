import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '../Services/Auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentUser: any;

  constructor(private authService: AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentuser') || '{}');
  }

  logout() {
    this.authService.logout();
  }

}
