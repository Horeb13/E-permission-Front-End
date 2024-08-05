// demande-de-permission.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DemandeDePermission } from '../Models/DemandeDePermission';
import { DemandeDePermissionDTO } from '../Models/Dto/DemandeDePermissionDTO';


@Injectable({
  providedIn: 'root'
})
export class DemandeDePermissionService {

  private apiUrl = 'http://localhost:8080/api/demandes';  

  constructor(private http: HttpClient) { }

  getDemandes(): Observable<DemandeDePermission[]> {
    return this.http.get<DemandeDePermission[]>(this.apiUrl);
  }

  getDemandeById(id: number): Observable<DemandeDePermissionDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<DemandeDePermissionDTO>(url);
  }

  createDemande(demande: DemandeDePermissionDTO): Observable<DemandeDePermissionDTO> {
    return this.http.post<DemandeDePermissionDTO>(this.apiUrl, demande);
  }

  updateDemande(id: number, demande: DemandeDePermission): Observable<DemandeDePermission> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<DemandeDePermission>(url, demande);
  }

  deleteDemande(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
