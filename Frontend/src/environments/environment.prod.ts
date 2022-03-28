import { CourseService as MockCourseService } from "src/app/services/course.mock.service";
import { CourseService } from "src/app/services/course.service";

export const environment = {
  production: true,
  providers: [
    { provide: MockCourseService, useClass: CourseService}
  ]
};
