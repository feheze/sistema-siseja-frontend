import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoloList } from './polo-list';

describe('PoloList', () => {
  let component: PoloList;
  let fixture: ComponentFixture<PoloList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoloList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoloList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
