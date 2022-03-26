import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { apiUrls } from '../constants/mockCourseData';
import { IHttpService } from './http-service.service.interface';

@Injectable({
  providedIn: 'root'
})

export class HttpService implements IHttpService{

  baseUrl: string = apiUrls.baseUrl;
  fileName:string = "";
  
  constructor(private http: HttpClient) { }


  uploadFile(formData: FormData): Observable<any> { 
    console.log("Mock file upload invoked for: "+ formData.get("isPrivate"));
    return of(apiUrls.uploadVideo);
  }

  // getFiles(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/files`);
  // }

}
