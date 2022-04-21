import { Injectable } from '@angular/core';
import { CourseService } from './course.mock.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  courseID: string = "";
  courseTitle : string = "";
  role : string | null= "guest";
  description: string = "";
  email : string | null = "";
  allCourses: [] = [];
  constructor(private courseService: CourseService) { 
    if (localStorage.getItem("role") !== null){
      this.role = localStorage.getItem("role")
    }

    if (localStorage.getItem("email") !== null){
      this.email = localStorage.getItem("email")
    }

    this.courseService.getAllCourses()
    .subscribe(res => { 
      this.allCourses = res.courses;
      console.log(this.allCourses);
    });

  }
}
