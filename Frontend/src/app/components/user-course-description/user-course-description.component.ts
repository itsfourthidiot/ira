import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-user-course-description',
  templateUrl: './user-course-description.component.html',
  styleUrls: ['./user-course-description.component.css']
})
export class UserCourseDescriptionComponent implements OnInit {

  @Input() courseId! : string
  description = "default"
  constructor(private courseService : CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourseDescriptionById(this.courseId).subscribe(
      (data) => {
        this.description = data.description;
      }
    )
  }

}
