import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PoloService } from '../../../services/polo';
import { Polo } from '../../../models/polo';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-polo-form',
  templateUrl: './polo-form.html',
  styleUrls: ['./polo-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule
  ]
})
export class PoloFormComponent {
  poloForm: FormGroup;
  polo = signal<Polo | null>(null);

  constructor(private fb: FormBuilder, private poloService: PoloService, private router: Router) {
    this.poloForm = this.fb.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      cep: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      coordenador: ['', Validators.required],
      ativo: [true],
      dataCriacao: [new Date()]
    });
  }

  onSubmit() {
    if (this.poloForm.valid) {
      const newPolo: Polo = this.poloForm.value;
      this.poloService.create(newPolo).subscribe(() => {
        // Handle successful submission (e.g., navigate back or show a success message)
        this.router.navigate(['/polos']); // Navigate back to the list of Polos
      });
    }
  }
}