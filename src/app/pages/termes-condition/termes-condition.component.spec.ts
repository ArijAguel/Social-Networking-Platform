import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermesConditionComponent } from './termes-condition.component';

describe('TermesConditionComponent', () => {
  let component: TermesConditionComponent;
  let fixture: ComponentFixture<TermesConditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermesConditionComponent]
    });
    fixture = TestBed.createComponent(TermesConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
