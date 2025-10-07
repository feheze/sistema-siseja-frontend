import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CursoService } from '../../../services/curso';
import { Curso } from '../../../models/curso';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-curso-detail',
  templateUrl: './curso-detail.html',
  styleUrls: ['./curso-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe, 
    CurrencyPipe, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    MatToolbarModule, 
    MatChipsModule, 
    MatTooltipModule,
    RouterLink
  ]
})
export class CursoDetailComponent {
  curso = signal<Curso | null>(null);

  constructor(private route: ActivatedRoute, private cursoService: CursoService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadCurso(id);
  }

  loadCurso(id: string | null) {
    if (id) {
      this.cursoService.getById(id).subscribe((data) => {
        this.curso.set(data);
      });
    }
  }
}