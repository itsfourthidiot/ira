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
  presignedUrl: string|null = null;
  moduleTitle: string| null = null;

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

      this.courseService.getModule(this.courseID, this.moduleID).subscribe(
      
        data => {
          console.log("Got Module ", data)
          this.moduleType = data.module.type 
          this.moduleTitle = data.module.title;
          if (this.moduleType == "quiz"){
            this.questionArray = data.module.quiz.questions
            console.log("Question Array: ",this.questionArray)
          }
          if(this.moduleType == "video"){
            console.log("Video Module!")
            this.presignedUrl = data.presignedUrl;
            console.log("presignedUrl: ",this.presignedUrl);
     
          }
  
        }
      )

    });
    // this.courseService.getModule(this.courseID, this.moduleID).subscribe(
      
    //   data => {
    //     console.log("Got Module ", data)
    //     this.moduleType = data.module.type 
    //     this.moduleTitle = data.module.title;
    //     if (this.moduleType == "quiz"){
    //       this.questionArray = data.module.quiz.questions
    //       console.log("Question Array: ",this.questionArray)
    //     }
    //     if(this.moduleType == "video"){
    //       console.log("Video Module!")
    //       this.presignedUrl = data.presignedUrl;
    //       console.log("presignedUrl: ",this.presignedUrl);
   
    //     }

    //   }
    // )
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
