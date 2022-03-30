import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CourseTitleDialogComponent } from '../course-title-dialog/course-title-dialog.component';
import { CourseService } from 'src/app/services/course.mock.service';
import { HttpService } from 'src/app/services/http-service.mock.service';
import { SharedService } from '../course-details/services/shared.service';

@Component({
  selector: 'app-instr-dashboard',
  templateUrl: './instr-dashboard.component.html',
  styleUrls: ['./instr-dashboard.component.css']
})
export class InstrDashboardComponent implements OnInit {

  
  id:number = 1;
  publishedCourses: any[] = []; 
  upublishedCourses: any[] = []; 

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private courseService: CourseService,
    private httpService: HttpService,
    private sharedService: SharedService
    ) { }

  ngOnInit(): void {
    this.httpService.getInstrCourses()
    .subscribe(response =>{
      console.log(response)
      this.publishedCourses = response.courses.published;      
      this.upublishedCourses = response.courses.unpublished;
      console.log("Unpublished Courses \n"+this.upublishedCourses);

    });
  }

  openModal(){
    console.log("Opened");
    const dialogRef = this.dialog.open(CourseTitleDialogComponent, {
      width: '400px'
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let newTitle = result;
      if(newTitle){
        console.log(newTitle)
        this.courseService.createNewCourse(newTitle)
        .subscribe(event => {     
          console.log(event);        
          //navigate to courseDetailspage
          this.sharedService.courseID = event.ID;
          this.sharedService.courseTitle = newTitle;          
          this.router.navigate([`/courseDetails/${event.ID}`]);   
        });
        
      } 
    });
  }


  openCourse(courseID: string, courseTitle: string){
    this.sharedService.courseID = courseID;
    this.sharedService.courseTitle = courseTitle;   
    this.router.navigate([`/courseDetails/${courseID}`]);
  }
}
