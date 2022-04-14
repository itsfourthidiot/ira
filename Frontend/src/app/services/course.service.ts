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
    return this.httpclient.get<any>(this.baseUrl + apiUrls.getAllCourses)
  }

  getCourseDescriptionById(courseId:string): Observable<any>{
    console.log("get description of course with course id :" + courseId);
    return this.httpclient.get<any>(this.baseUrl + apiUrls.getCourseDescription.replace('<courseId>', courseId));
  }

  updateCourseDescriptionById(courseId:string, description:string): Observable<any>{
    var obj = {"description": description};
    console.log(obj);
    return this.httpclient.put<any>(this.baseUrl + apiUrls.updateDescription.replace('<courseId>', courseId), obj);
  }

  checkEnrollMent(courseId:string): Observable<any>{
    return this.httpclient.get<any>(this.baseUrl + apiUrls.checkEnroll.replace('<courseId>', courseId));
  }

  studentEnroll(courseId: string): Observable<any>{
    // var obj = {"courseId" : courseId};
    //return this.httpclient.post<any>(this.baseUrl + "studentEnrol", obj);
    return this.httpclient.post<any>(this.baseUrl + apiUrls.studentEnroll.replace('<courseId>', courseId), null);
  }

  getCourseDetails(courseId: string): Observable<any>{
    return this.httpclient.get<any>(this.baseUrl + apiUrls.getCourseDetails.replace('<courseId>', courseId))
  }

  publishCourse(courseId: string): Observable<any>{
    return this.httpclient.put<any>(this.baseUrl + apiUrls.publishCourse.replace('<courseId>', courseId), null)
  }

  getModule(courseId: string, moduleId: string): Observable<any>{
    return this.httpclient.get<any>(this.baseUrl + apiUrls.getModule.replace('<courseId>', courseId).replace('<moduleId>', moduleId))
  }

  calculateGrade(courseId: string, moduleId: string, filledOptions: []){
    var obj = {"moduleId": moduleId, "response": filledOptions}
    return this.httpclient.post<any>(this.baseUrl + apiUrls.calculateGrade.replace('<courseId>', courseId), obj)

  }

}
