import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdDashboardComponent } from './std-dashboard.component';

describe('StdDashboardComponent', () => {
  let component: StdDashboardComponent;
  let fixture: ComponentFixture<StdDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StdDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StdDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
