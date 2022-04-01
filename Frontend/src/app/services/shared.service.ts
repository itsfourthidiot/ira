import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  courseID: string = "";
  courseTitle : string = "";
  role : string = "";
  
  constructor() { }
}
