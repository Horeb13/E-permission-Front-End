import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../Models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = 'http://localhost:8080/api/roles'; 

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les rôles
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl);
  }

  // Méthode pour récupérer un rôle par son ID
  getRoleById(id: number): Observable<Role> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Role>(url);
  }

  // Méthode pour créer un nouveau rôle
  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, role);
  }

  // Méthode pour mettre à jour un rôle existant
  updateRole(id: number, role: Role): Observable<Role> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Role>(url, role);
  }

  // Méthode pour supprimer un rôle
  deleteRole(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
