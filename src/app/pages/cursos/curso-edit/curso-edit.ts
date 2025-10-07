import { 
  ChangeDetectionStrategy, 
  Component, 
  DestroyRef, 
  inject, 
  signal 
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { CursoService } from '../../../services/curso';
import { CreateCursoDTO, Curso } from '../../../models/curso';
import { EMPTY, catchError, finalize, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-curso-edit',
  templateUrl: './curso-edit.html',
  styleUrls: ['./curso-edit.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
  ]
})
export class CursoEditComponent {
  private readonly cursoService = inject(CursoService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly curso = signal<Curso | null>(null);

  readonly modalidades = [
    'EAD', 'Presencial', 'Híbrido', 'Semipresencial'
  ];

  readonly niveis = [
    'Graduação', 'Pós-graduação', 'Mestrado', 'Doutorado', 'Técnico', 'Extensão'
  ];

  readonly areasConhecimento = [
    'Ciências Exatas e da Terra',
    'Ciências Biológicas',
    'Engenharias',
    'Ciências da Saúde',
    'Ciências Agrárias',
    'Ciências Sociais Aplicadas',
    'Ciências Humanas',
    'Linguística, Letras e Artes',
    'Multidisciplinar'
  ];

  readonly form = this.fb.nonNullable.group({
    nome: ['', [Validators.required]],
    codigo: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    cargaHoraria: [0, [Validators.required, Validators.min(1)]],
    duracaoMeses: [0, [Validators.required, Validators.min(1)]],
    quantidadeModulos: [0, [Validators.required, Validators.min(1)]],
    quantidadeDisciplinas: [0, [Validators.required, Validators.min(1)]],
    modalidade: ['', [Validators.required]],
    nivel: ['', [Validators.required]],
    areaConhecimento: ['', [Validators.required]],
    coordenador: ['', [Validators.required]],
    valorMensalidade: [0, [Validators.required, Validators.min(0)]],
    vagasDisponiveis: [0, [Validators.required, Validators.min(1)]],
    dataInicio: [new Date(), [Validators.required]],
    ativo: [true]
  });

  constructor(private snackBar: MatSnackBar) {
    this.loadCurso();
  }

  private loadCurso(): void {
    this.route.params.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(params => {
        if (!params['id']) {
          this.router.navigate(['/cursos']);
          return EMPTY;
        }

        this.loading.set(true);
        this.error.set(null);

        return this.cursoService.getById(params['id']).pipe(
          catchError(() => {
            this.handleError('Erro ao carregar curso');
            return EMPTY;
          }),
          finalize(() => this.loading.set(false))
        );
      })
    ).subscribe(curso => {
      this.curso.set(curso);
      this.form.patchValue(curso);
    });
  }

  private getChangedFields(formValue: CreateCursoDTO, originalCurso: Curso): Partial<CreateCursoDTO> {
    type FormFields = keyof CreateCursoDTO;
    
    return (Object.keys(formValue) as FormFields[]).reduce((changes, key) => {
      const newValue = formValue[key];
      const originalValue = originalCurso[key];

      if (key === 'ativo') {
        (changes as any)[key] = Boolean(newValue);
      } else if (key === 'cargaHoraria' || key === 'duracaoMeses' || key === 'quantidadeModulos' || 
                 key === 'quantidadeDisciplinas' || key === 'valorMensalidade' || key === 'vagasDisponiveis') {
        (changes as any)[key] = Number(newValue);
      } else if (key === 'dataInicio') {
        (changes as any)[key] = newValue instanceof Date ? newValue : new Date(newValue as string);
      } else {
        (changes as any)[key] = String(newValue);
      }

      return changes;
    }, {} as Partial<CreateCursoDTO>);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const curso = this.curso();
    if (!curso) return;

    this.loading.set(true);
    this.error.set(null);
    
    const changes = this.getChangedFields(this.form.getRawValue(), curso);

    if (Object.keys(changes).length === 0) {
      this.router.navigate(['/cursos']);
      return;
    }

    this.cursoService.update(curso.id, changes).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError(() => {
        this.handleError('Erro ao atualizar curso');
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
      this.router.navigate(['/cursos']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/cursos']);
  }

  handleError(message: string): void {
    this.snackBar.open(message, 'Falha', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
    this.error.set(message);
    this.loading.set(false);
  }
}