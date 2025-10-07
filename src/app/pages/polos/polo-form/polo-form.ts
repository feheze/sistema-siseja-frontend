import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { PoloService } from '../../../services/polo';
import { EMPTY, catchError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-polo-form',
  templateUrl: './polo-form.html',
  styleUrls: ['./polo-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSlideToggleModule
  ]
})
export class PoloFormComponent {
  private readonly poloService = inject(PoloService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);

  readonly form = this.fb.nonNullable.group({
    nome: ['', [Validators.required]],
    endereco: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    cep: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    coordenador: ['', [Validators.required]],
    ativo: [true]
  });

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading.set(true);
    
    this.poloService.create(this.form.getRawValue()).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError(() => {
        this.loading.set(false);
        return EMPTY;
      })
    ).subscribe(() => {
      this.loading.set(false);
      this.router.navigate(['/polos']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/polos']);
  }
}