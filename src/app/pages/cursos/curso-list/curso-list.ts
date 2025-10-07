import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

// Módulos do Material necessários para o template HTML
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Curso } from '../../../models/curso';
import { CursoService } from '../../../services/curso';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  templateUrl: './curso-list.html', 
  styleUrls: ['./curso-list.scss'],
  imports: [
    CommonModule,
    RouterLink,        
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule
  ]
})
export class CursoListComponent implements OnInit {
  // Injeta o serviço
  private readonly cursoService = inject(CursoService);
  private readonly fb = inject(FormBuilder);

  // Inicializa a Signal que o template usa: cursos()
  cursos = signal<Curso[]>([]);
  isLoading = signal(true);
  error = signal<any>(null);
  filterType = signal<'all' | 'active' | 'byModalidade' | 'byNivel'>('all');

  readonly filterForm = this.fb.nonNullable.group({
    modalidade: [''],
    nivel: ['']
  });

  readonly modalidades = [
    'EAD', 'Presencial', 'Híbrido', 'Semipresencial'
  ];

  readonly niveis = [
    'Graduação', 'Pós-graduação', 'Mestrado', 'Doutorado', 'Técnico', 'Extensão'
  ];

  ngOnInit(): void {
    this.loadAllCursos();
  }

  loadAllCursos(): void {
    this.isLoading.set(true);
    this.filterType.set('all');
    this.cursoService.getAll().subscribe({
      next: (data) => {
        this.cursos.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err);
        this.isLoading.set(false);
        console.error('Erro ao carregar Cursos:', err);
      }
    });
  }

  loadActiveCursos(): void {
    this.isLoading.set(true);
    this.filterType.set('active');
    this.cursoService.getAtivos().subscribe({
      next: (data) => {
        this.cursos.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err);
        this.isLoading.set(false);
        console.error('Erro ao carregar Cursos ativos:', err);
      }
    });
  }

  loadCursosByModalidade(): void {
    const modalidade = this.filterForm.get('modalidade')?.value;
    if (!modalidade) return;

    this.isLoading.set(true);
    this.filterType.set('byModalidade');
    this.cursoService.getByModalidade(modalidade).subscribe({
      next: (data) => {
        this.cursos.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err);
        this.isLoading.set(false);
        console.error('Erro ao carregar Cursos por modalidade:', err);
      }
    });
  }

  loadCursosByNivel(): void {
    const nivel = this.filterForm.get('nivel')?.value;
    if (!nivel) return;

    this.isLoading.set(true);
    this.filterType.set('byNivel');
    this.cursoService.getByNivel(nivel).subscribe({
      next: (data) => {
        this.cursos.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err);
        this.isLoading.set(false);
        console.error('Erro ao carregar Cursos por nível:', err);
      }
    });
  }

  deleteCurso(id: string): void {
    if (confirm('Tem certeza que deseja deletar este curso?')) {
      this.cursoService.delete(id).subscribe({
        next: () => {
          // Reload the current filter
          if (this.filterType() === 'all') {
            this.loadAllCursos();
          } else if (this.filterType() === 'active') {
            this.loadActiveCursos();
          } else if (this.filterType() === 'byModalidade') {
            this.loadCursosByModalidade();
          } else if (this.filterType() === 'byNivel') {
            this.loadCursosByNivel();
          }
        },
        error: (err) => {
          console.error('Erro ao deletar curso:', err);
        }
      });
    }
  }
}