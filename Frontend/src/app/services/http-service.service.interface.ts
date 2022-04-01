import { Observable } from "rxjs";
import { Question } from "../models/Question";

export interface IHttpService {

  // file upload service
  uploadFile(formData: FormData, courseID: string): Observable<any>;

  //get instructor courses
  getInstrCourses() : Observable<any>;

  uploadQuiz(courseID: string, questArray: Question[], courseTitle: string): Observable<any>
}