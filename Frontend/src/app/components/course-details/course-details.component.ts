import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.mock.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  courseID = "1"
  enrolled = false
  constructor(
    private courseService : CourseService,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.courseID = params.courseID;
      console.log("courseId is "+ params.courseID);
      this.sharedService.courseID = this.courseID;
    });

    this.courseService.getAllCourses().subscribe(
      (data) => {
        console.log(data);
      }
    )   
  }


}
