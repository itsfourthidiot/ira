export const apiUrls = {
    baseUrl : 'http://10.20.106.43:8080',
    updateDescription : '/instructor/course/<courseId>/description',
    createCourses : '/instructor/course',
    instrCourses : '/instructor/courses',
    uploadVideo : '/instructor/course/<courseId>/module/video',
    getAllCourses : '/courses',
    uploadQuiz : '/instructor/course/<courseId>/module/quiz',
    getCourseDetails : '/course/<courseId>',
    publishCourse : '/instructor/course/<courseId>/publish',
    studentEnroll : '/student/course/<courseId>/enroll',
    checkEnroll : '/student/course/<courseId>/enroll',
    getCourseDescription : '/instructor/course/<courseId>/description'
}