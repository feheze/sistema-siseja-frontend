import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoloService } from '../../../services/polo';
import { Polo } from '../../../models/polo';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-polo-detail',
  templateUrl: './polo-detail.html',
  styleUrls: ['./polo-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe] // Import DatePipe here
})
export class PoloDetailComponent {
  polo = signal<Polo | null>(null);

  constructor(private route: ActivatedRoute, private poloService: PoloService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadPolo(id);
  }

  loadPolo(id: string | null) {
    if (id) {
      this.poloService.getById(+id).subscribe((data) => {
        this.polo.set(data);
      });
    }
  }
}