import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { apiUrls } from '../constants/apiConstants';
import { Course } from '../interfaces/Course';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(apiUrls.getAllCourses);
  }
}
