import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.mock.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<any[]> | undefined;

  searchTerm: string = "";
  courses: any[] = [];
  term: string = "";

  
  constructor(
    private courseService: CourseService,
    private router: Router,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.courseService.getAllCourses()
    .subscribe(res=>{
      console.log(" RESULT ",res.courses)
      this.courses = res.courses;      
      console.log("Search-BOX allCourses ",this.courses)

    });
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.title)),
      map(title => (title ? this._filter(title) : this.courses.slice())),
    );
  }

  private _filter(title: string): any[] {
    const filterValue = title.toLowerCase();
    return this.courses.filter(course => course.title.toLowerCase().includes(filterValue));
  }

  onOptionSelected(courseTitle:string, courseID:string){
    console.log("Course selected :",courseID)
    this.sharedService.courseID = courseID;
    this.sharedService.courseTitle = courseTitle;
    this.myControl.reset();
    this.router.navigate([`/courseDetails/${courseID}`]);
  }

}
