import { TestBed } from '@angular/core/testing';
import { PoloFormComponent } from './polo-form';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routesAll } from '../../../../app/app.routes';

describe('PoloFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoloFormComponent],
      providers: [
        provideRouter(routesAll),
        provideHttpClient()
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PoloFormComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});