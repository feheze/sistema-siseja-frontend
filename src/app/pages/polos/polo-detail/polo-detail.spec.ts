import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoloDetail } from './polo-detail';

describe('PoloDetail', () => {
  let component: PoloDetail;
  let fixture: ComponentFixture<PoloDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoloDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoloDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
