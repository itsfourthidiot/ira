import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  moduleID: string = "";
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
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
  }

}
