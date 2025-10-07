import { 
  ChangeDetectionStrategy, 
  Component, 
  DestroyRef, 
  inject, 
  signal 
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PoloService } from '../../../services/polo';
import { CreatePoloDTO, Polo } from '../../../models/polo';
import { EMPTY, catchError, finalize, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-polo-edit',
  templateUrl: './polo-edit.html',
  styleUrls: ['./polo-edit.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule
  ]
})
export class PoloEditComponent {
  private readonly poloService = inject(PoloService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly snackBar = inject(MatSnackBar);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly polo = signal<Polo | null>(null);

  readonly estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  readonly form = this.fb.nonNullable.group({
    nome: ['', [Validators.required]],
    endereco: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    estado: ['', [Validators.required]],
    cep: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    coordenador: ['', [Validators.required]],
    capacidadeMaxima: [0, [Validators.required, Validators.min(1)]],
    ativo: [true]
  });

  constructor() {
    this.loadPolo();
  }

  private loadPolo(): void {
    this.route.params.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(params => {
        if (!params['id']) {
          this.router.navigate(['/polos']);
          return EMPTY;
        }

        this.loading.set(true);
        this.error.set(null);

        return this.poloService.getById(params['id']).pipe(
          catchError(() => {
            this.handleError('Erro ao carregar polo');
            return EMPTY;
          }),
          finalize(() => this.loading.set(false))
        );
      })
    ).subscribe(polo => {
      this.polo.set(polo);
      this.form.patchValue(polo);
    });
  }

  private getChangedFields(formValue: CreatePoloDTO, originalPolo: Polo): Partial<CreatePoloDTO> {
    type FormFields = keyof CreatePoloDTO;
    
    return (Object.keys(formValue) as FormFields[]).reduce((changes, key) => {
      const newValue = formValue[key];
      const originalValue = originalPolo[key];

      if (key === 'ativo') {
        (changes as any)[key] = Boolean(newValue);
      } else if (key === 'capacidadeMaxima') {
        (changes as any)[key] = Number(newValue);
      } else {
        (changes as any)[key] = String(newValue);
      }

      return changes;
    }, {} as Partial<CreatePoloDTO>);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const polo = this.polo();
    if (!polo) return;

    this.loading.set(true);
    this.error.set(null);
    
    const changes = this.getChangedFields(this.form.getRawValue(), polo);

    if (Object.keys(changes).length === 0) {
      this.router.navigate(['/polos']);
      return;
    }

    this.poloService.update(polo.id, changes).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError(() => {
        this.handleError('Erro ao atualizar polo');
        return EMPTY;
      }),
      finalize(() => this.loading.set(false))
    ).subscribe(() => {
      this.snackBar.open('Alteração realizada com sucesso!', 'Sucesso', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['snackbar-success']
      });
      this.router.navigate(['/polos']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/polos']);
  }

  reloadPolo(): void {
    this.loadPolo();
  }

  private handleError(message: string): void {
    this.snackBar.open(message, 'Falha', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
    this.error.set(message);
    this.loading.set(false);
  }
}