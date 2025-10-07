import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreateCursoDTO, Curso, createCurso } from '../models/curso';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CursoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/cursos`;

  private generateIdempotencyKey(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-Idempotency-Key': this.generateIdempotencyKey()
    });
  }

  getAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(data: CreateCursoDTO): Observable<Curso> {
    const curso = createCurso(data);
    const headers = this.createHeaders();
    return this.http.post<Curso>(this.apiUrl, curso, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, changes: Partial<CreateCursoDTO>): Observable<Curso> {
    const headers = this.createHeaders();
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, changes, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<void> {
    const headers = this.createHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getAtivos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/ativos`).pipe(
      catchError(this.handleError)
    );
  }

  getByModalidade(modalidade: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/modalidade/${modalidade}`).pipe(
      catchError(this.handleError)
    );
  }

  getByNivel(nivel: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/nivel/${nivel}`).pipe(
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