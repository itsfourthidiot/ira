import { Observable } from "rxjs";

export interface ICourseService{
    getCourseDescriptionById(id:string): Observable<any>;
    
    updateCourseDescriptionById(id:string, description:string): Observable<any>;
    
    checkEnrollMent(courseId:string): Observable<boolean>;
    
    studentEnroll(courseId: string): Observable<boolean>;
}