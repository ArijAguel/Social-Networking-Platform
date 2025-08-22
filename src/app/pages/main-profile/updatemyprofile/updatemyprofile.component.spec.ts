import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemyprofileComponent } from './updatemyprofile.component';

describe('UpdatemyprofileComponent', () => {
  let component: UpdatemyprofileComponent;
  let fixture: ComponentFixture<UpdatemyprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatemyprofileComponent]
    });
    fixture = TestBed.createComponent(UpdatemyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
