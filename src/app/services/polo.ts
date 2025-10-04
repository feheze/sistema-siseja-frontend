import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Polo } from '../models/polo';
import { Observable, catchError, throwError } from 'rxjs'; // Adicionado catchError e throwError

@Injectable({ providedIn: 'root' })
export class PoloService {
  

  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/polos`;


  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(environment.apiUrl);
    if (error.status === 0) {
      // Erro do lado do cliente ou rede
      console.error('Um erro de cliente/rede ocorreu:', error.error);
    } else {
      // O backend retornou um código de resposta sem sucesso.
      console.error(
        `Erro no backend: Código ${error.status}, corpo: `, error.error);
    }
    // Retorna um Observable que lança uma mensagem de erro orientada ao usuário.
    return throwError(() => new Error('Ocorreu um erro ao processar a solicitação. Tente novamente mais tarde.'));
  }

  getAll(): Observable<Polo[]> {
    return this.http.get<Polo[]>(this.apiUrl).pipe(
      // Aplica o tratamento de erro
      catchError(this.handleError) 
    );
  }

  getById(id: number): Observable<Polo> {
    return this.http.get<Polo>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  create(polo: Omit<Polo, 'id'>): Observable<Polo> {
    return this.http.post<Polo>(this.apiUrl, polo).pipe(
      catchError(this.handleError)
    );
  }


  update(id: number, polo: Partial<Polo>): Observable<Polo> {
    return this.http.put<Polo>(`${this.apiUrl}/${id}`, polo).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
