import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericApiService {
  private apiUrl = 'http://localhost:3000/';
  
  constructor(private http: HttpClient) {}

  getAll<T>(endPoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}${endPoint}` );
  }

  getOne<T>(endPoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${endPoint}/${id}` );
  }

  create<T>(endPoint: string, data: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${endPoint}`, data);
  }

  update<T>(endPoint: string, id: number, data: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${endPoint}/${id}`, data);
  }

  delete<T>(endPoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${endPoint}/${id}`);
  }
}
