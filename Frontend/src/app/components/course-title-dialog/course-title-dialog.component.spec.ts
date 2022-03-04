import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTitleDialogComponent } from './course-title-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('CourseTitleDialogComponent', () => {
  let component: CourseTitleDialogComponent;
  let fixture: ComponentFixture<CourseTitleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseTitleDialogComponent ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTitleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
