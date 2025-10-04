import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoloListComponent } from './polo-list';

describe('PoloListComponent', () => {
  let component: PoloListComponent;
  let fixture: ComponentFixture<PoloListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoloListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoloListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
