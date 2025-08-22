import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Etape7Component } from './etape7.component';

describe('Etape7Component', () => {
  let component: Etape7Component;
  let fixture: ComponentFixture<Etape7Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Etape7Component]
    });
    fixture = TestBed.createComponent(Etape7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
