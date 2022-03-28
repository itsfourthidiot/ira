import { Observable } from "rxjs";

export interface IHttpService {

  // file upload service
  uploadFile(formData: FormData, courseID: string): Observable<any>;

  //get instructor courses
  getInstrCourses() : Observable<any>;
}