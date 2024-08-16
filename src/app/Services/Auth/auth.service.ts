import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '../../Models/Dto/Login';
import { Register } from '../../Models/Dto/Register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; 
  private currentUser: any;
  private roles :any[] = [];
  private activeRole: any; // Change this to your actual API endpoint

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(login: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/signIn`, login);
  }

  register(register: Register): Observable<any> {
    return this.http.post(`${this.apiUrl}/signUp`, register);
    
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentuser');
    window.location.reload();
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  isAdmin(): boolean {
    this.currentUser = this.getCurrentuser()
    const token = this.getToken();
    return token && this.jwtHelper.decodeToken(token).roles.includes("ROLE_Administrateur"); // Change this to your actual admin role ID
  }
  isSuperAdmin(): boolean {
    const token = this.getToken();
    console.log(this.jwtHelper.decodeToken().roles);
    return token && this.jwtHelper.decodeToken(token).roles.includes("ROLE_SuperAdministrateur"); // Change this to your actual admin role ID
  }
  isDirecteur(): boolean {
    const token = this.getToken();
    return token && this.jwtHelper.decodeToken(token).roles.includes("ROLE_Directeur"); // Change this to your actual admin role ID
  }
  isChefDeDepartement(): boolean {
    const token = this.getToken();
    return token && this.jwtHelper.decodeToken(token).roles.includes("ROLE_Chef de departement"); // Change this to your actual admin role ID
  }
  isDrh(): boolean {
    const token = this.getToken();
    return token && this.jwtHelper.decodeToken(token).roles.includes("ROLE_Directeur des ressources humaines"); // Change this to your actual admin role ID
  }

  isStandard():boolean {
    const token = this.getToken();
    return token && this.jwtHelper.decodeToken(token).roles.includes("ROLE_standard1");
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getCurrentuser(): any {
    this.currentUser = JSON.parse(localStorage.getItem('currentuser') || '{}');
    return this.currentUser;
  }

  getUserRoles(): any[]{
    const token = this.getToken();
    this.roles = this.jwtHelper.decodeToken().roles;
    return this.roles; 
  }

    // Définit le rôle actif
  setActiveRole(role: any): void {
    this.activeRole = role;
    localStorage.setItem('activeRole', JSON.stringify(role)); // Vous pouvez aussi le stocker dans le localStorage
  }

  // Récupère le rôle actif
  getActiveRole(): any {
    return this.activeRole || JSON.parse(localStorage.getItem('activeRole')!);
  }

  // Vérifiez si l'utilisateur a un rôle particulier
  isRole(libelle: string): boolean {
    const activeRole = this.getActiveRole();
    return activeRole && activeRole === libelle;
  }
}