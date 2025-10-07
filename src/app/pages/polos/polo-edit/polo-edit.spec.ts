import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { PoloEdit } from './polo-edit';

describe('PoloEdit', () => {
  let component: PoloEdit;
  let fixture: ComponentFixture<PoloEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoloEdit],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
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
