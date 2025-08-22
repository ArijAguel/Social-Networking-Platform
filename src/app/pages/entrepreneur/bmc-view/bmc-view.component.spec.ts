import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcViewComponent } from './bmc-view.component';

describe('BmcViewComponent', () => {
  let component: BmcViewComponent;
  let fixture: ComponentFixture<BmcViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmcViewComponent]
    });
    fixture = TestBed.createComponent(BmcViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
