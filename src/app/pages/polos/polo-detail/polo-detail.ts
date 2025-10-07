import { Component, signal, ChangeDetectionStrategy, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, EMPTY } from 'rxjs';
import { PoloService } from '../../../services/polo';
import { Polo } from '../../../models/polo';

@Component({
  selector: 'app-polo-detail',
  templateUrl: './polo-detail.html',
  styleUrls: ['./polo-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    DatePipe,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ]
})
export class PoloDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly poloService = inject(PoloService);
  private readonly destroyRef = inject(DestroyRef);

  readonly polo = signal<Polo | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly poloId = signal<string | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    this.poloId.set(id);
    this.loadPolo(id);
  }

  loadPolo(id: string | null): void {
    if (!id) {
      this.router.navigate(['/polos']);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.poloService.getById(id).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError(() => {
        this.error.set('Erro ao carregar detalhes do polo');
        return EMPTY;
      }),
      finalize(() => this.loading.set(false))
    ).subscribe(data => {
      this.polo.set(data);
    });
  }
}