import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoloDetailComponent  } from './polo-detail';

describe('PoloDetailComponent', () => {
  let component: PoloDetailComponent;
  let fixture: ComponentFixture<PoloDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoloDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoloDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
