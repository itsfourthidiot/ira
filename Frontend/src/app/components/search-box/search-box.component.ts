import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;

  searchTerm: string = "";
  courses: string[] = ["course1","angular"];
  term: string = "";

  
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.courses.filter(course => course.toLowerCase().includes(filterValue));
  }

  onOptionSelected(course:string){
    console.log("Course selected :",course)
  }

}
