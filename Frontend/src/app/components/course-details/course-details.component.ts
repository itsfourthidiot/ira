import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.mock.service';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  courseID = "1"
  courseTitle = ""
  enrolled = false
  constructor(
    private courseService : CourseService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.courseID = this.sharedService.courseID;
    this.courseTitle = this.sharedService.courseTitle;
    this.courseService.getAllCourses().subscribe(
      (data) => {
        console.log(data);
      }
    )   
  }


}
