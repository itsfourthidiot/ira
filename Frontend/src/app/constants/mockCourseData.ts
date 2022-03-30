import { allCourses } from "src/assets/data/allCourses";
import { createCourse } from "src/assets/data/createCourse";
import { uploadVideo } from "src/assets/data/uploadVideo";
import { loginResponse } from "src/assets/data/loginResponse";
import { registerResponse } from "src/assets/data/registerResponse";
import { instrCourses } from "src/assets/data/instructorCourses";

export const apiUrls = {
    baseUrl : '../../assets/data/',
    getAllCourses : allCourses,
    createCourse : createCourse,
    uploadVideo : uploadVideo,     
    login : loginResponse,
    register : registerResponse,
    instrCourses :  instrCourses
}