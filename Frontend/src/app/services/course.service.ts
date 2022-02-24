import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = "http://10.20.106.43:8080/course/"

  constructor(
    private httpclient: HttpClient,
    private router: Router
  ) { }

  getCourseDescriptionById(id:string): Observable<any>{
    console.log("get description of course with course id :" + id);
    return this.httpclient.get<any>(this.apiUrl + "getDescription" + "?courseId=" + id);
  }

  updateCourseDescriptionById(id:string, description:string): Observable<any>{
    var obj = {"courseId": id, "description": description};
    console.log(obj);
    return this.httpclient.put<any>(this.apiUrl + "updateDescription", obj);
  }
}
