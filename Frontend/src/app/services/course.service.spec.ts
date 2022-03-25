import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject } from '@angular/core/testing';

describe('CourseService', () => {
  let courseService: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    courseService = TestBed.inject(CourseService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(courseService).toBeTruthy();
  });
   

});
