// type-de-permission.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeDePermission } from '../Models/TypeDePermission';

@Injectable({
  providedIn: 'root'
})
export class TypeDePermissionService {

  private apiUrl = 'http://localhost:8080/api/typedepermissions';

  constructor(private http: HttpClient) { }

  getTypeDePermissions(): Observable<TypeDePermission[]> {
    
    return this.http.get<TypeDePermission[]>(this.apiUrl);
  }

  getTypeDePermissionById(id: number): Observable<TypeDePermission> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<TypeDePermission>(url);
  }

  createTypeDePermission(typeDePermission: TypeDePermission): Observable<TypeDePermission> {
    return this.http.post<TypeDePermission>(this.apiUrl, typeDePermission);
  }

  updateTypeDePermission(id: number, typeDePermission: TypeDePermission): Observable<TypeDePermission> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<TypeDePermission>(url, typeDePermission);
  }

  deleteTypeDePermission(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
