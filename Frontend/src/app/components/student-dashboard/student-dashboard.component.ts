import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/Course';



@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  email!: string
  currentStudentDb: Object = {}
  courses!: Course[] 

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
      this.email = params.email;
      console.log("user email is "+ params.email);
      this.authService.getStudentDashBoard(this.email).subscribe(
        (res) => {
          this.currentStudentDb = res;
          this.courses = res.courses;
        }
      )
    });
    
  }

}
