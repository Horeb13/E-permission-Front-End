import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/Auth/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Login } from '../Models/Dto/Login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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
          this.router.navigate(['/home']);
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
