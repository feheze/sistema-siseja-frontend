import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoloEdit } from './polo-edit';

describe('PoloEdit', () => {
  let component: PoloEdit;
  let fixture: ComponentFixture<PoloEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoloEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoloEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
