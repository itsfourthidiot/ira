import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ICourseService } from './course.service.interface';
import { apiUrls } from '../constants/apiConstants';
import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root'
})

export class CourseService implements ICourseService{

  private baseUrl = apiUrls.baseUrl;

  constructor(
    private httpclient: HttpClient,
    private router: Router
  ) { }

  createNewCourse(title: string): Observable<any> {
    let url = this.baseUrl+ apiUrls.createCourses;
    var obj = {"title" : title};
    return this.httpclient.post<any>(url, obj);
  }

  getAllCourses(): Observable<any> {
    console.log("Test");
    throw new Error('Method not implemented.');
  }

  getCourseDescriptionById(id:string): Observable<any>{
    console.log("get description of course with course id :" + id);
    return this.httpclient.get<any>(this.baseUrl + apiUrls.updateDescription + "?courseId=" + id);
  }

  updateCourseDescriptionById(id:string, description:string): Observable<any>{
    var obj = {"courseId": id, "description": description};
    console.log(obj);
    return this.httpclient.put<any>(this.baseUrl + "updateDescription", obj);
  }

  checkEnrollMent(courseId:string): Observable<boolean>{
    return this.httpclient.get<any>(this.baseUrl + "checkEnrollMent" + "?courseId=" + courseId);
  }

  studentEnroll(courseId: string): Observable<boolean>{
    var obj = {"courseId" : courseId};
    return this.httpclient.post<any>(this.baseUrl + "studentEnrol", obj);
  }
}
