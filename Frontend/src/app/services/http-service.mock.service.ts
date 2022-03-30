import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { apiUrls } from '../constants/mockCourseData';
import { IHttpService } from './http-service.service.interface';
import { Question } from '../models/Question';

@Injectable({
  providedIn: 'root'
})

export class HttpService implements IHttpService{

  baseUrl: string = apiUrls.baseUrl;
  fileName:string = "";
  
  constructor() { }

  getInstrCourses(): Observable<any> {
    console.log("Mock get instructor courses invoked ");
    return of(apiUrls.instrCourses);
  }

  uploadFile(formData: FormData, courseID: string): Observable<any> { 
    console.log("Mock file upload invoked for course: "+ courseID);
    return of(apiUrls.uploadVideo);
  }

  uploadQuiz(courseID: string, questArray: Question[], courseTitle: string): Observable<any>{
    console.log("Mock quiz upload invoked for course: "+ courseID);
    return of(apiUrls.uploadQuiz);
  }

  // getFiles(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/files`);
  // }

}
