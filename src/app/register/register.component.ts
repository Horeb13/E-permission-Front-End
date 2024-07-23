import { Component } from '@angular/core';
import { AuthService } from '../Services/Auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Register } from '../Models/Dto/Register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink ],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      departement: ['', Validators.required]
    });
  }

  register() {
    let singIn: Register = new Register();
    singIn.nom = this.registerForm.value.nom;
    singIn.prenom = this.registerForm.value.prenom;
    singIn.email = this.registerForm.value.email;
    singIn.password = this.registerForm.value.password;
    singIn.role = this.registerForm.value.role;
    singIn.departement = this.registerForm.value.departement;
    if (this.registerForm.valid) {
      this.authService.register(singIn).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: error => {
          console.error('Error during login:', error);
        }
      });
    }
  }
}