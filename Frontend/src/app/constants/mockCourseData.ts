import { allCourses } from "src/assets/data/allCourses";
import { createCourse } from "src/assets/data/createCourse";
import { loginResponse } from "src/assets/data/loginResponse";
import { registerResponse } from "src/assets/data/registerResponse";

export const apiUrls = {
    baseUrl : '../../assets/data/',
    getAllCourses : allCourses,
    createCourse : createCourse,
    login : loginResponse,
    register: registerResponse
}