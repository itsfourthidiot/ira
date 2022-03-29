import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { apiUrls } from '../constants/mockCourseData';
import { IHttpService } from './http-service.service.interface';

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

}
