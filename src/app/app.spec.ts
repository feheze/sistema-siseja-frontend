import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { provideRouter } from '@angular/router';
import { routesAll } from './app.routes';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(routesAll)
      ]
    }).compileComponents();
  });

  it('should render <app-navigation>', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navigation')).toBeTruthy();
  });
});