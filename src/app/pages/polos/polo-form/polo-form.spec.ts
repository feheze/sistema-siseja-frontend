import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoloFormComponent } from './polo-form';

describe('PoloFormComponent', () => {
  let component: PoloFormComponent;
  let fixture: ComponentFixture<PoloFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoloFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoloFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
