import { CourseService as MockCourseService } from "src/app/services/course.mock.service";
import { CourseService } from "src/app/services/course.service";
import { HttpService as MockHttpService} from "src/app/services/http-service.mock.service";
import { HttpService } from "src/app/services/http-service.service";
export const environment = {
  production: true,
  providers: [
    { provide: MockCourseService, useClass: CourseService},
    { provide: MockHttpService, useClass: HttpService}
  ]
};
