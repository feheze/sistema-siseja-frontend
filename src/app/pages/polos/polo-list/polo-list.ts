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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Polo } from '../../../models/polo'; // Assumindo que a interface Polo está definida
import { PoloService } from '../../../services/polo'; // Assumindo que o serviço está aqui

@Component({
  selector: 'app-polo-list',
  standalone: true,
  templateUrl: './polo-list.html', 
  styleUrls: ['./polo-list.scss'],
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
    ReactiveFormsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ]
})
export class PoloListComponent implements OnInit {
  // Injeta o serviço
  private readonly poloService = inject(PoloService);
  private readonly fb = inject(FormBuilder);

  // Inicializa a Signal que o template usa: polos()
  polos = signal<Polo[]>([]);
  isLoading = signal(true);
  error = signal<any>(null);
  filterType = signal<'all' | 'active' | 'byState'>('all');

  readonly filterForm = this.fb.nonNullable.group({
    estado: ['']
  });

  readonly estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  ngOnInit(): void {
    this.loadAllPolos();
  }

  loadAllPolos(): void {
    this.isLoading.set(true);
    this.filterType.set('all');
    this.poloService.getAll().subscribe({
      next: (data) => {
        this.polos.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err);
        this.isLoading.set(false);
        console.error('Erro ao carregar Polos:', err);
      }
    });
  }

  loadActivePolos(): void {
    this.isLoading.set(true);
    this.filterType.set('active');
    this.poloService.getAtivos().subscribe({
      next: (data) => {
        this.polos.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err);
        this.isLoading.set(false);
        console.error('Erro ao carregar Polos ativos:', err);
      }
    });
  }

  loadPolosByEstado(): void {
    const estado = this.filterForm.get('estado')?.value;
    if (!estado) return;

    this.isLoading.set(true);
    this.filterType.set('byState');
    this.poloService.getByEstado(estado).subscribe({
      next: (data) => {
        this.polos.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err);
        this.isLoading.set(false);
        console.error('Erro ao carregar Polos por estado:', err);
      }
    });
  }

  deletePolo(id: string): void {
    if (confirm('Tem certeza que deseja deletar este polo?')) {
      this.poloService.delete(id).subscribe({
        next: () => {
          // Reload the current filter
          if (this.filterType() === 'all') {
            this.loadAllPolos();
          } else if (this.filterType() === 'active') {
            this.loadActivePolos();
          } else if (this.filterType() === 'byState') {
            this.loadPolosByEstado();
          }
        },
        error: (err) => {
          console.error('Erro ao deletar polo:', err);
        }
      });
    }
  }
}
