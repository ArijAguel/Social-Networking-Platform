import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerifComponent } from './email-verif.component';

describe('EmailVerifComponent', () => {
  let component: EmailVerifComponent;
  let fixture: ComponentFixture<EmailVerifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailVerifComponent]
    });
    fixture = TestBed.createComponent(EmailVerifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
