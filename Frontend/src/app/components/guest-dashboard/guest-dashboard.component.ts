import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/services/course.mock.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-dashboard',
  templateUrl: './guest-dashboard.component.html',
  styleUrls: ['./guest-dashboard.component.css']
})
export class GuestDashboardComponent implements OnInit {

  type: string = "";
  subscription: Subscription = new Subscription();
  allCourses: any[] = [];

  constructor(
    private profile: ProfileService,
    private courseService: CourseService,
    private sharedService: SharedService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.profile.changeType("guest");
    this.courseService.getAllCourses()
    .subscribe(res =>{
      this.allCourses = res.courses;   
      console.log(this.allCourses)   
    });
  }

  openCourse(courseID: string, courseTitle: string){
    this.sharedService.courseID = courseID;
    this.sharedService.courseTitle = courseTitle;   
    this.router.navigate([`/courseDetails/${courseID}`]);
  }

}
