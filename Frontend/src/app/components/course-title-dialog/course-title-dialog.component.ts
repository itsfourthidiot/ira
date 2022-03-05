import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-course-title-dialog',
  templateUrl: './course-title-dialog.component.html',
  styleUrls: ['./course-title-dialog.component.css']
})
export class CourseTitleDialogComponent implements OnInit {
  title: string = "";
  
  constructor(
    public dialogRef: MatDialogRef<CourseTitleDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
