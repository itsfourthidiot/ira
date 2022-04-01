import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth.service';
import { AuthService } from 'src/app/services/auth.mock.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/Course';
import { SharedService } from 'src/app/services/shared.service';



@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  email!: string
  currentStudentDb: Object = {}
  courses!: any[] 

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router) { }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
      this.email = params.email;
      console.log("user email is "+ params.email);
      this.authService.getStudentDashBoard(this.email).subscribe(
        (res) => {
          this.currentStudentDb = res;
          console.log(this.currentStudentDb)
          this.courses = res.courses;
          console.log("courses" + this.courses)
        }
      )
    });
    
  }

  goToCourse(courseID: string, courseTitle: string){
    this.sharedService.courseID = courseID;
    this.sharedService.courseTitle = courseTitle;   
    this.router.navigate([`/courseDetails/${courseID}`]);
  }

}
