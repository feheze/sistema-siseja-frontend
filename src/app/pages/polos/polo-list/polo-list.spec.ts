import { TestBed } from '@angular/core/testing';
import { PoloListComponent } from './polo-list';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routesAll } from '../../../../app/app.routes';

describe('PoloListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoloListComponent],
      providers: [
        provideHttpClient(),
        provideRouter(routesAll)
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PoloListComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});