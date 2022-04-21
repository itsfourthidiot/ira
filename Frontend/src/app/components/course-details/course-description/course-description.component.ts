import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { CourseService } from 'src/app/services/course.mock.service';

@Component({
  selector: 'app-course-description',
  templateUrl: './course-description.component.html',
  styleUrls: ['./course-description.component.css']
})
export class CourseDescriptionComponent implements OnInit {

  @Input() courseId! : string
  description = ""
  role : string | null= ""

  constructor(private courseService : CourseService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.courseId = this.sharedService.courseID;
    this.role = this.sharedService.role;
    console.log(" Course Description Role "+this.sharedService.role)
    this.courseService.getCourseDetails(this.courseId).subscribe(
      (data) => {
        console.log("data" + data);
        console.log("Course Details "+ data.description)
        this.description = data.description;
        this.sharedService.description = data.description;        
      }
    )

    console.log("Description "+ this.sharedService.description)
  }

  updateDesc(){
    // send a put request using description
    console.log("update button");
    this.courseService.updateCourseDescriptionById(this.courseId, this.description).subscribe(
      (data) => {
        this.description = data.description;
      }
    )
  }

  publishCourse(){
    
  }

}
