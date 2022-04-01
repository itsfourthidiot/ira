import { Observable } from "rxjs";
import { Course } from "../models/Course";

export interface ICourseService{
    getCourseDescriptionById(id:string): Observable<any>;
    
    updateCourseDescriptionById(id:string, description:string): Observable<any>;
    
    checkEnrollMent(courseId:string): Observable<boolean>;
    
    studentEnroll(courseId: string): Observable<boolean>;

    getAllCourses(): Observable<any>;

    createNewCourse(title: string): Observable<any>;

    getCourseDetails(courseId: string): Observable<any>;

    publishCourse(courseId: string): Observable<any>;
}