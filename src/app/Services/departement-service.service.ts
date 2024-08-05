import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departement } from '../Models/Departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  private apiUrl = 'http://localhost:8080/api/departements';  

  constructor(private http: HttpClient) { }

  getDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(this.apiUrl);
  }

  getDepartementById(id: number): Observable<Departement> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Departement>(url);
  }

  createDepartement(departement: Departement): Observable<Departement> {
    return this.http.post<Departement>(this.apiUrl, departement);
  }

  updateDepartement(id: number, departement: Departement): Observable<Departement> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Departement>(url, departement);
  }

  deleteDepartement(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
