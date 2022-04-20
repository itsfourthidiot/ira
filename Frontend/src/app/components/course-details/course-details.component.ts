import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.mock.service';
import { SharedService } from '../../services/shared.service';
import { AuthService } from 'src/app/services/auth.mock.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  courseID = "1"
  courseTitle = ""
  enrolled = false
  role : string | null= ""
  isPublished = false;
  hideIcon = false;
  modules: any[] = [];
  module1: string = "";
  description: string = "";

  constructor(
    private courseService : CourseService,
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.courseID = this.sharedService.courseID;
    this.courseTitle = this.sharedService.courseTitle;
    this.role = this.sharedService.role;
    this.hideIcon = false;
    this.description = this.sharedService.description;

    console.log("hideIcon  "+this.hideIcon)
    if (this.role == "student"){
      this.courseService.checkEnrollMent(this.courseID).subscribe(
        (data) => {
          this.enrolled = data.isEnrolled
        }
      )
    }
    
    this.courseService.getCourseDetails(this.courseID).subscribe(
      (data) => {
        console.log("Course Details "+data.description)
        this.sharedService.description = data.description;
        this.modules = data.modules
        if(this.modules.length==0){
          console.log("LENGTH "+ this.modules.length )
          this.hideIcon = true;
        }else{
          this.module1 = this.modules[0].ID;
        }
        this.isPublished = data.isPublished;
      }
    )
  
  }

  loadCurriculum(){
    console.log("load Curriculum")
    if(this.role == "instructor"){
      this.router.navigate([`./curriculum`], {relativeTo: this.route});
    }
    else{
      //load first item from module
      this.router.navigate([`./module/${this.module1}`], {relativeTo: this.route});  
    }
  }

  publishCourse(){
    this.courseService.publishCourse(this.courseID).subscribe(
      (data) => {
        this.isPublished = data?.isPublished
      }
    )
  }

  loadModule(moduleID:string){
    console.log("loadModule called!!!!!!!!!!!!!!")
    console.log(this.route)
    // if(this.role == "instructor"){
    //   this.router.navigate([`.././module/${moduleID}`], {relativeTo: this.route});
    // }
    // else{
      this.router.navigate([`.././module/${moduleID}`], {relativeTo: this.route});
    // }
  }

  enroll(){
    if (this.authService.isLoggedIn){
      this.courseService.studentEnroll(this.courseID).subscribe(
        (data) => {
            console.log(data);
        }
      )
      this.enrolled = true;
    } else {
      this.router.navigate(['studentLogin'], {queryParams: {returnUrl : this.router.routerState.snapshot.url}})
    }

  }
}
