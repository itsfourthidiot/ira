import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CourseTitleDialogComponent } from '../course-title-dialog/course-title-dialog.component';

@Component({
  selector: 'app-instr-dashboard',
  templateUrl: './instr-dashboard.component.html',
  styleUrls: ['./instr-dashboard.component.css']
})
export class InstrDashboardComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }
  id:number = 1;

  openModal(){
    console.log("Opened");
    const dialogRef = this.dialog.open(CourseTitleDialogComponent, {
      width: '400px'
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let newTitle = result;
      console.log(newTitle)
      //create new empty course with new title 
      //call createCourse api which will return courseID
      //navigate to courseDetailspage

    });
  }

  // this.router.navigate([`/courseDetails/${this.id}`]);

}
