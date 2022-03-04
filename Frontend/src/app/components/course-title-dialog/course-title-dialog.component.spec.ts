import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTitleDialogComponent } from './course-title-dialog.component';

describe('CourseTitleDialogComponent', () => {
  let component: CourseTitleDialogComponent;
  let fixture: ComponentFixture<CourseTitleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseTitleDialogComponent ]
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
