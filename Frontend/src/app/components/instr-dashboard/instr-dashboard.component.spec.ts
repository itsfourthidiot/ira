import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrDashboardComponent } from './instr-dashboard.component';

describe('InstrDashboardComponent', () => {
  let component: InstrDashboardComponent;
  let fixture: ComponentFixture<InstrDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
