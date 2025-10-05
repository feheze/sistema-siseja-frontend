import { TestBed } from '@angular/core/testing';
import { PoloService } from './polo';
import { provideHttpClient } from '@angular/common/http';

describe('PoloService', () => {
  let service: PoloService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PoloService,
        provideHttpClient()
      ]
    });
    service = TestBed.inject(PoloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Adicione seus outros testes aqui
});