import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http-service.service';
import { Course } from 'src/app/models/Course';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  searchTerm: string = "";
  courses: Course[] = [];
  term: string = "";
  
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
      this.httpService.getAllCourses()
      .subscribe(
        response => {
          console.log(response);
          this.courses = response;
        }
      )
      
  }

}
