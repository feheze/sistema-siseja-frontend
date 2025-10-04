import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Módulos do Material necessários para o template HTML
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
  ]
})
export class PoloListComponent implements OnInit {
  // Injeta o serviço
  private readonly poloService = inject(PoloService);

  // Inicializa a Signal que o template usa: polos()
  polos = signal<Polo[]>([]);
  isLoading = signal(true);
  error = signal<any>(null);

  ngOnInit(): void {
    // Busca os dados e atualiza a Signal
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
}
