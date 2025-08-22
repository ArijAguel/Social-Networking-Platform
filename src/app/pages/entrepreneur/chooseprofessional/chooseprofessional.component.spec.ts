import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseprofessionalComponent } from './chooseprofessional.component';

describe('ChooseprofessionalComponent', () => {
  let component: ChooseprofessionalComponent;
  let fixture: ComponentFixture<ChooseprofessionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseprofessionalComponent]
    });
    fixture = TestBed.createComponent(ChooseprofessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
