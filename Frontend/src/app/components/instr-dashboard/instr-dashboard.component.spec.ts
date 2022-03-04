import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrDashboardComponent } from './instr-dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('InstrDashboardComponent', () => {
  let component: InstrDashboardComponent;
  let fixture: ComponentFixture<InstrDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrDashboardComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule
      ],
      providers: [
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialogRef, useValue: {} }
        ]
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
