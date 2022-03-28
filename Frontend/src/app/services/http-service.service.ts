import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { apiUrls } from '../constants/apiConstants';
// import { Course } from '../models/Course';
import { IHttpService } from './http-service.service.interface';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HttpService implements IHttpService{

  baseUrl: string = apiUrls.baseUrl;
  fileName: string = "";
  uploadProgress: number = 0;

  constructor(private http: HttpClient) { }

  getInstrCourses(): Observable<any> {
    let url = this.baseUrl+apiUrls.instrCourses;
    return this.http.get<any>(url);
  }


  uploadFile(formData: FormData, courseID: string): Observable<any> {   
      //change url
      let urlStr = apiUrls.uploadVideo.replace('<courseId>', courseID)
      let url = this.baseUrl+urlStr;
      return this.http.post(url, formData, {
        reportProgress: true,
        observe: 'events'
    });
  }

}
