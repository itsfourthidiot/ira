import { Question } from './../../../models/Question';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { CourseService } from 'src/app/services/course.mock.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  moduleID: string = "";
  courseID: string = "";
  moduleType: string = "";
  questionArray: Question[] = [];
  filledOptionArray: number[] = []
  score: number = 0

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.courseID = this.sharedService.courseID;
    this.activatedRoute.params.subscribe(params => {
      console.log("Module ID "+ params.moduleID);
      console.log("route "+ this.activatedRoute);
      
      this.moduleID = params.moduleID;
      console.log("MODULE COMPONENT INVOKED WITH ID "+this.moduleID)

      // this.authService.getStudentDashBoard(this.email).subscribe(
      //   (res) => {
      //     this.currentStudentDb = res;
      //     console.log(this.currentStudentDb)
      //     this.courses = res.courses;
      //     console.log("courses" + this.courses)
      //   }
      // )
    });
    this.courseService.getModule(this.courseID, this.moduleID).subscribe(
      
      data => {
        console.log("Got Modele ", data)
        this.moduleType = data.type 
        if (this.moduleType == "quiz"){
          this.questionArray = data.quiz.Questions

        }

      }
    )
    console.log(this.questionArray)
  }

  fillOptions(event: any, optionId: number){
    if (event.target.checked){
      this.filledOptionArray.push(optionId)
      
    } else {
      const index = this.filledOptionArray.indexOf(optionId)
      if (index > -1){
        this.filledOptionArray.splice(index, 1)
      }
    }
    console.log(this.filledOptionArray)

  }

  submitAnswer(){
    this.courseService.calculateGrade(this.courseID, this.moduleID, this.filledOptionArray).subscribe(
      data => {
        this.score = data.scoreValue
      }
    )
  }



}
