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
  private currentUser: any;// Change this to your actual API endpoint

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
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getCurrentuser(): any {
    this.currentUser = JSON.parse(localStorage.getItem('currentuser') || '{}');
    //console.log(this.currentUser);
    return this.currentUser;
  }
}
