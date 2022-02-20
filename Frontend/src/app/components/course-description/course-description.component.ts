import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-description',
  templateUrl: './course-description.component.html',
  styleUrls: ['./course-description.component.css']
})
export class CourseDescriptionComponent implements OnInit {

  @Input() courseId! : string
  description = ""
  constructor() { }

  ngOnInit(): void {
    // send a get request to update course description
  }

  updateDesc(){
    // send a put request using description

  }

}
