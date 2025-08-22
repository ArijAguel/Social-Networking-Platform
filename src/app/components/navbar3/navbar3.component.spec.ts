import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar3Component } from './navbar3.component';

describe('Navbar3Component', () => {
  let component: Navbar3Component;
  let fixture: ComponentFixture<Navbar3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Navbar3Component]
    });
    fixture = TestBed.createComponent(Navbar3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
