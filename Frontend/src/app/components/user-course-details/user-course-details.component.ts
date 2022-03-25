import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, 
  UrlTree, CanActivate, ActivatedRoute,Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
import { AuthService } from 'src/app/services/auth.mock.service';

  

@Component({
  selector: 'app-user-course-details',
  templateUrl: './user-course-details.component.html',
  styleUrls: ['./user-course-details.component.css']
})
export class UserCourseDetailsComponent implements OnInit {

  id = "1"
  enrolled = false
  showCourseContent = false

  constructor(private courseService : CourseService,
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // check if user is enrolled for the given course using courseID and token
    this.courseService.checkEnrollMent(this.id).subscribe(
      (data) => {
        this.enrolled = data
      }
    )
  }

  enroll(){
    if (this.authService.isLoggedIn){
      this.courseService.studentEnroll(this.id).subscribe(
        (data) => {
          this.enrolled = data;
          this.showCourseContent = data;
          if (data === false){

          }

        }
      )
    } else {
      this.router.navigate(['studentLogin'], {queryParams: {returnUrl : this.router.routerState.snapshot.url}})
    }

  }

}
