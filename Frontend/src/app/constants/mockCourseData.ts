import { allCourses } from "src/assets/data/allCourses";
import { createCourse } from "src/assets/data/createCourse";
import { uploadVideo } from "src/assets/data/uploadVideo";

export const apiUrls = {
    baseUrl : '../../assets/data/',
    getAllCourses : allCourses,
    createCourse : createCourse,
    uploadVideo : uploadVideo     
}