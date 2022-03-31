import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.mock.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  courseID = "1"
  courseTitle = ""
  enrolled = false
  role = ""

  constructor(
    private courseService : CourseService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.courseID = this.sharedService.courseID;
    this.courseTitle = this.sharedService.courseTitle;
    this.role = this.sharedService.role;
    this.courseService.getAllCourses().subscribe(
      (data) => {
        console.log(data);
      }
    )   
  }

  loadCurriculum(){

    console.log("load Curriculum")
    if(this.role == "instructor"){
      this.router.navigate([`./curriculum`], {relativeTo: this.route});
    }
    else{
      this.router.navigate(['./module/1'], {relativeTo: this.route});  
    }
  }
}
