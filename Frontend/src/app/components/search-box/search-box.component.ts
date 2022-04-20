import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

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
    private sharedService: SharedService,
    private router: Router) { }

  ngOnInit(): void {
    
    this.courses =  this.sharedService.allCourses;
    console.log("NavBar allCourses ",this.courses)
    
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

  onOptionSelected(courseID:string){
    console.log("Course selected :",courseID)
    this.myControl.reset();
    this.router.navigate([`/courseDetails/${courseID}`]);

  }

}
