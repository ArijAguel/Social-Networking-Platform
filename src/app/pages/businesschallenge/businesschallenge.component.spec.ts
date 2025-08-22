import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesschallengeComponent } from './businesschallenge.component';

describe('BusinesschallengeComponent', () => {
  let component: BusinesschallengeComponent;
  let fixture: ComponentFixture<BusinesschallengeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinesschallengeComponent]
    });
    fixture = TestBed.createComponent(BusinesschallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
