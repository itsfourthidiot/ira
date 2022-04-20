import { Question } from './../../../models/Question';
import { Component, OnChanges, OnInit, SimpleChanges, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { CourseService } from 'src/app/services/course.mock.service';



@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit, AfterViewInit{

  moduleID: string = "";
  courseID: string = "";
  moduleType: string = "";
  questionArray: Question[] = [];
  filledOptionArray: number[] = []
  score: number = 0
  prevScore: number = 0
  // @Input() presignedUrl: string|null = null;
  preSignedUrl = ""

  moduleTitle: string| null = null;
 
  // videoElement = document.querySelector("#video")

@ViewChild('video')
public video!: ElementRef;



  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private courseService: CourseService,
    private elRef: ElementRef
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
            this.prevScore = data.score
            console.log("Question Array: ",this.questionArray)
          }
          if(this.moduleType == "video"){
            console.log("Video Module!")
            this.preSignedUrl = data.presignedUrl;
            console.log("presignedUrl: ",this.preSignedUrl);
            // this.video.nativeElement.pause()
            console.log(this.video.nativeElement)
            this.video.nativeElement.src = this.preSignedUrl;
            this.video.nativeElement.load();
            this.video.nativeElement.play();     
          }  
        }
      )

    });
  }

  ngAfterViewInit(): void {
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
            this.preSignedUrl = data.presignedUrl;
            console.log("presignedUrl: ",this.preSignedUrl);
            // this.video.nativeElement.pause()
            console.log(this.video.nativeElement)
            this.video.nativeElement.src = this.preSignedUrl;
            this.video.nativeElement.load();
            this.video.nativeElement.play();
     
          }
  
        }
      )

    });
      
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
        this.prevScore = data.scoreValue
      }
    )
  }

  playVideo() {
    console.log("video url is " + this.preSignedUrl)
    this.video.nativeElement.src = this.preSignedUrl;
    this.video.nativeElement.load();
    this.video.nativeElement.play();
  }





}
