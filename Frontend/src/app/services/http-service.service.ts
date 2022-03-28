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


  uploadFile(formData: FormData): Observable<any> {   
      //change url
      return this.http.post("/api/thumbnail-upload", formData, {
        reportProgress: true,
        observe: 'events'
    });
  }

}
