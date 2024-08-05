import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Direction } from '../Models/Direction';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {

  private apiUrl = 'http://localhost:8080/api/directions';  

  constructor(private http: HttpClient) { }

  getDirections(): Observable<Direction[]> {
    return this.http.get<Direction[]>(this.apiUrl);
  }

  getDirectionById(id: number): Observable<Direction> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Direction>(url);
  }

  createDirection(direction: Direction): Observable<Direction> {
    return this.http.post<Direction>(this.apiUrl, direction);
  }

  updateDirection(id: number, direction: Direction): Observable<Direction> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Direction>(url, direction);
  }

  deleteDirection(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
