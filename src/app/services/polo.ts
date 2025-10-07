import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreatePoloDTO, Polo, createPolo } from '../models/polo';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PoloService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/polos`;

  getAll(): Observable<Polo[]> {
    return this.http.get<Polo[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<Polo> {
    return this.http.get<Polo>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(data: CreatePoloDTO): Observable<Polo> {
    const polo = createPolo(data);
    return this.http.post<Polo>(this.apiUrl, polo).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, changes: Partial<CreatePoloDTO>): Observable<Polo> {
    return this.http.put<Polo>(`${this.apiUrl}/${id}`, changes).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      console.error('Client or network error:', error.error);
    } else {
      console.error(`Backend error: ${error.status}`, error.error);
    }
    return throwError(() => new Error('Failed to process request. Please try again.'));
  }
}