import { TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation';

describe('NavigationComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavigationComponent],
      // providers: [{ provide: ActivatedRoute, useValue: {} }], // só se erro NG0201 aparecer!
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});