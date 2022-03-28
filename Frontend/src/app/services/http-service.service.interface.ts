import { Observable } from "rxjs";

export interface IHttpService {

  // file upload service
  uploadFile(formData: FormData): Observable<any>;
}