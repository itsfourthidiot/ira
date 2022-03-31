import { Option } from './../../../../models/Option';
import { Question } from './../../../../models/Question';
import { Component, Renderer2, OnInit, ElementRef, ViewChild, AfterViewInit, VERSION } from '@angular/core';
import { HttpService } from 'src/app/services/http-service.mock.service'; 
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title: string = ""
  questArr: Question[] = []
  courseID: string = "";
  @ViewChild('questions', { static: false }) questions!: ElementRef;

  constructor(private el: ElementRef, 
    private renderer:Renderer2,
    private httpService: HttpService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.courseID = this.sharedService.courseID;
    console.log("courseId is "+ this.courseID);
  }

  addQuestion(){
    const question = this.renderer.createElement('div');
    this.renderer.setAttribute(question, "id", "wrapper")
    const questionText = this.renderer.createElement('input');
    this.renderer.setAttribute(questionText, "placeholder", "Enter question")
    this.renderer.setAttribute(questionText, "class", "mainQuestion")
    const option1 = this.renderer.createElement('input');
    this.renderer.setAttribute(option1, "placeholder", "Enter option 1")
    this.renderer.setAttribute(option1, "class", "option")
    const isCorrect1 = this.renderer.createElement('input');
    this.renderer.setAttribute(isCorrect1, "type", "checkbox");
    const option2 = this.renderer.createElement('input');
    this.renderer.setAttribute(option2, "placeholder", "Enter option 2")
    this.renderer.setAttribute(option2, "class", "option")
    const isCorrect2 = this.renderer.createElement('input');
    this.renderer.setAttribute(isCorrect2, "type", "checkbox");
    const option3 = this.renderer.createElement('input');
    this.renderer.setAttribute(option3, "placeholder", "Enter option 3")
    this.renderer.setAttribute(option3, "class", "option")
    const isCorrect3 = this.renderer.createElement('input');
    this.renderer.setAttribute(isCorrect3, "type", "checkbox");
    const option4 = this.renderer.createElement('input');
    this.renderer.setAttribute(option4, "placeholder", "Enter option 4");
    this.renderer.setAttribute(option4, "class", "option")
    const isCorrect4 = this.renderer.createElement('input');
    this.renderer.setAttribute(isCorrect4, "type", "checkbox");
    this.renderer.appendChild(question, questionText);
    this.renderer.appendChild(question, option1);
    this.renderer.appendChild(question, isCorrect1);
    this.renderer.appendChild(question, option2);
    this.renderer.appendChild(question, isCorrect2);
    this.renderer.appendChild(question, option3);
    this.renderer.appendChild(question, isCorrect3);
    this.renderer.appendChild(question, option4);
    this.renderer.appendChild(question, isCorrect4);
    const spacer = this.renderer.createElement('div')
    this.renderer.setAttribute(spacer, "class", "spacer")
    this.renderer.appendChild(question, spacer);
    this.renderer.appendChild(this.questions.nativeElement, question)
    console.log("inside add question")
  }

  submitQuiz(){
    //iterate over children of question element
    var questionArray = this.questions.nativeElement.children;
    console.log(questionArray.length);
    for (let i = 0; i < questionArray.length; i++){
      let question = questionArray[i];
      // console.log(question);
      let questionChildren = question.children;
      // console.log(questionChildren);
      let newQuestion : Question = {content: "", options: []}
      newQuestion.content = questionChildren[0].value;
      // console.log(newQuestion)
      let options: Option[] = []
      let option1: Option = {content: "", isCorrect: false}
      let option2: Option = {content: "", isCorrect: false}
      let option3: Option = {content: "", isCorrect: false}
      let option4: Option = {content: "", isCorrect: false}
      option1.content = questionChildren[1].value
      option1.isCorrect = questionChildren[2].checked
      option2.content = questionChildren[3].value
      option2.isCorrect = questionChildren[4].checked
      option3.content = questionChildren[5].value
      option3.isCorrect = questionChildren[6].checked
      option4.content = questionChildren[7].value
      option4.isCorrect = questionChildren[8].checked
      options.push(option1)
      options.push(option2)
      options.push(option3)
      options.push(option4)
      newQuestion.options = options
      console.log(newQuestion)
      this.questArr.push(newQuestion)
      
    }
    console.log(this.questArr)
    this.httpService.uploadQuiz(this.courseID, this.questArr, this.title).subscribe(
      (res) => {
        alert("Quiz was posted successfully")
      }
      
    );
    const childElements = this.questions.nativeElement.children;
    for (let child of childElements) {
      this.renderer.removeChild(this.questions.nativeElement, child);
    }
    
  }

}
