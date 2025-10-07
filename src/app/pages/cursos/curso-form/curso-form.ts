import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { CursoService } from '../../../services/curso';
import { EMPTY, catchError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.html',
  styleUrls: ['./curso-form.scss'],
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
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterLink
  ]
})
export class CursoFormComponent {
  private readonly cursoService = inject(CursoService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);

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

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading.set(true);
    
    this.cursoService.create(this.form.getRawValue()).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError(() => {
        this.loading.set(false);
        return EMPTY;
      })
    ).subscribe(() => {
      this.loading.set(false);
      this.router.navigate(['/cursos']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/cursos']);
  }
}