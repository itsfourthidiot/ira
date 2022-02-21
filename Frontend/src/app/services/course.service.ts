import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = "http://10.20.106.6:8080/"

  constructor(
    private httpclient: HttpClient,
    private router: Router
  ) { }

  getCourseDescriptionById(id:string): Observable<string>{
    console.log("get description of course with course id :" + id);
    return this.httpclient.get<any>(this.apiUrl + "?id=" + id);
  }
}
