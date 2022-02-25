import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCourseDescriptionComponent } from './user-course-description.component';

describe('UserCourseDescriptionComponent', () => {
  let component: UserCourseDescriptionComponent;
  let fixture: ComponentFixture<UserCourseDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCourseDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCourseDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
