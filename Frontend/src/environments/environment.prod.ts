import { CourseService as MockCourseService } from "src/app/services/course.mock.service";
import { CourseService } from "src/app/services/course.service";
import { HttpService as MockHttpService} from "src/app/services/http-service.mock.service";
import { HttpService } from "src/app/services/http-service.service";
import { AuthService as MockAUthService } from "src/app/services/auth.mock.service";
import { AuthService } from "src/app/services/auth.service";

export const environment = {
  production: true,
  providers: [
    { provide: MockCourseService, useClass: CourseService},
    { provide: MockHttpService, useClass: HttpService},
    { provide: MockAUthService, useClass: AuthService}
  ]
};
