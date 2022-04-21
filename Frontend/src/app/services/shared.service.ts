import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  courseID: string = "";
  courseTitle : string = "";
  role : string | null= "guest";
  description: string = "";
  email : string | null = "";
  allCourses: [] = [];
  constructor() { 
    if (localStorage.getItem("role") !== null){
      this.role = localStorage.getItem("role")
    }

    if (localStorage.getItem("email") !== null){
      this.email = localStorage.getItem("email")
    }
  }
}
