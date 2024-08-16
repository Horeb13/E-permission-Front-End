import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/Auth/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Login } from '../Models/Dto/Login';
import { LayoutService } from '../Services/app.layout.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterLink, 
    RouterModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule
  ],
  templateUrl: './login.component.html',
  styles: [`
    :host ::ng-deep .pi-eye,
    :host ::ng-deep .pi-eye-slash {
        transform:scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
    }
`]
})
export class LoginComponent {

  valCheck: string[] = ['remember'];

    password!: string;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, public layoutService: LayoutService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, ],
      password: ['', Validators.required,]
    });
  }

  login() {
    let logIn: Login = new Login();
    logIn.email = this.loginForm.value.email;
    logIn.password = this.loginForm.value.password;
    this.authService.login(logIn).subscribe({
      next: response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentuser', JSON.stringify(response.userDetails));
          const roles = this.authService.getUserRoles();
          if (roles.length > 1) {
            this.router.navigate(['/role-selection']); // Redirige vers la page de sélection de rôle
          } else {
            // Sinon, connectez l'utilisateur directement
            this.authService.setActiveRole(roles[0]);
            this.router.navigate(['/home']);
          }
          
        } else {
          console.error('No token in response:', response);
        }
        // Handle successful login
      },
      error: error => {
        console.error('Error during login:', error);
        
      }
    });
  }
}
