import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverProjectsComponent } from './discover-projects.component';

describe('DiscoverProjectsComponent', () => {
  let component: DiscoverProjectsComponent;
  let fixture: ComponentFixture<DiscoverProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoverProjectsComponent]
    });
    fixture = TestBed.createComponent(DiscoverProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
