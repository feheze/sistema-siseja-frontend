import { TestBed } from '@angular/core/testing';
import { PoloDetailComponent } from './polo-detail';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routesAll } from '../../../../app/app.routes';

describe('PoloDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoloDetailComponent],
      providers: [
        provideRouter(routesAll),
        provideHttpClient()
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PoloDetailComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});