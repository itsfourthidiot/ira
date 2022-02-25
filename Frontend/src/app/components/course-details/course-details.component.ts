import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  id = "1"
  enrolled = false
  constructor(private courseService : CourseService) { }

  ngOnInit(): void {
    // check if user is enrolled for the given course using courseID and token
    // this.courseService.checkEnrollMent(this.id).subscribe(
    //   (data) => {
    //     this.enrolled = data
    //   }
    // )
    


  }

  // enroll(){

  // }

}
