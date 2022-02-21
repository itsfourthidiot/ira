import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-description',
  templateUrl: './course-description.component.html',
  styleUrls: ['./course-description.component.css']
})
export class CourseDescriptionComponent implements OnInit {

  @Input() courseId! : string
  description = ""
  constructor(private courseService : CourseService) { }

  ngOnInit(): void {
    // send a get request to update course description
    this.courseService.getCourseDescriptionById(this.courseId).subscribe(
      (data) => {
        this.description = data;
      }
    )
  }

  updateDesc(){
    // send a put request using description

  }

}
