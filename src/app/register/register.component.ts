import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Register } from '../Models/Dto/Register';
import { RoleService } from '../Services/role.service';
import { Role } from '../Models/Role';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { Departement } from '../Models/Departement';
import { DepartementService } from '../Services/departement-service.service';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, 
    ReactiveFormsModule,
    RouterLink,
    MultiSelectModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    DropdownModule ],
    styles: [`
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
          transform:scale(1.6);
          margin-right: 1rem;
          color: var(--primary-color) !important;
      }
  `]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  roles: Role[] = [];
  departemets: Departement[] = [];

  constructor(private authService: AuthService, private router: Router, 
    private fb: FormBuilder, private roleService: RoleService, private departementService: DepartementService) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      departement: ['', Validators.required],
      roles: [[], Validators.required],
    });

  }

  ngOnInit(): void {
    this.getRoles();
    this.getDepartments();

  }


  public getRoles(){
    this.roleService.getRoles().subscribe({
      next: roles => {
        this.roles = roles
        console.log(this.roles)
        
      },
      error: error => {
        console.error('Error during fetching roles:', error);
      }
    });

  }

  public getDepartments(){
    this.departementService.getDepartements().subscribe({
      next: departements => {
        this.departemets = departements
        console.log(this.departemets)
        
      },
      error: error => {
        console.error('Error during fetching departements:', error);
      }
    }
    )
  }


  register() {
    let singIn: Register = new Register();
    singIn.nom = this.registerForm.value.nom;
    singIn.prenom = this.registerForm.value.prenom;
    singIn.email = this.registerForm.value.email;
    singIn.password = this.registerForm.value.password;
    singIn.role = this.registerForm.value.roles;
    console.log(singIn.role);
    singIn.departement = this.registerForm.value.departement.code;
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