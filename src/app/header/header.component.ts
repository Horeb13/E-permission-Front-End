import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { AuthService } from '../Services/Auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentUser: any;

  constructor(private authService: AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentuser') || '{}');
  }

  logout() {
    this.authService.logout();
  }

}
