import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ICourseService } from './course.service.interface';
import { apiUrls } from '../constants/mockCourseData';
import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService implements ICourseService{

  constructor(
    private httpclient: HttpClient,
    private router: Router
  ) { }

  createNewCourse(title: string): Observable<any> {
    return of(apiUrls.createCourse);
  }

  getCourseDescriptionById(id:string): Observable<any>{
    console.log("get description of course with course id :" + id);
    return this.httpclient.get<any>("getDescription" + "?courseId=" + id);

  }

  updateCourseDescriptionById(id:string, description:string): Observable<any>{
    // var obj = {"courseId": id, "description": description};
    // console.log(obj);
    return of(apiUrls.updateDescription)
  }

  checkEnrollMent(courseId:string): Observable<any>{
    return of(apiUrls.checkEnroll);
  }

  studentEnroll(courseId: string): Observable<any>{
    // var obj = {"courseId" : courseId};
    // return this.httpclient.post<any>("studentEnrol", obj);
    return of(apiUrls.studentEnroll)
  }

  getAllCourses(): Observable<any>{
    return of(apiUrls.getAllCourses);
  }

  getCourseDetails(courseId: string): Observable<any>{
    return of(apiUrls.getCourseDetails);
  }

  publishCourse(courseId: string): Observable<any>{
    return of(apiUrls.publishCourse);
  }

  getModule(courseId: string, moduleId: string): Observable<any>{
    return of(apiUrls.getModule)
  }
}
