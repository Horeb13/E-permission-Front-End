import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';// Assurez-vous que le chemin est correct
import { Departement } from '../Models/Departement';
// Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private apiUrl = 'http://localhost:8080/api/departements'; 

  constructor(private http: HttpClient) { }

  // Obtenir tous les départements
  getDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(this.apiUrl);
  }

  // Obtenir un département par ID
  getDepartementById(id: number): Observable<Departement> {
    return this.http.get<Departement>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau département
  createDepartement(departement: Departement): Observable<Departement> {
    return this.http.post<Departement>(this.apiUrl, departement);
  }

  // Mettre à jour un département
  updateDepartement(id: number, departement: Departement): Observable<Departement> {
    return this.http.put<Departement>(`${this.apiUrl}/${id}`, departement);
  }

  // Supprimer un département
  deleteDepartement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
