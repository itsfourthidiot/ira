import { Observable } from "rxjs";
import { Course } from "../models/Course";

export interface ICourseService{
    getCourseDescriptionById(id:string): Observable<any>;
    
    updateCourseDescriptionById(id:string, description:string): Observable<any>;
    
    checkEnrollMent(courseId:string): Observable<boolean>;
    
    studentEnroll(courseId: string): Observable<boolean>;

    getAllCourses(): Observable<any>;

    createNewCourse(title: string): Observable<any>;
}