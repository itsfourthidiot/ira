import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorLoginComponent } from './components/instructor-login/instructor-login.component';
import { StudentLoginComponent } from './components/student-login/student-login.component';
import { AuthGuard } from './services/auth.guard'
import { InstrDashboardComponent } from './components/instr-dashboard/instr-dashboard.component';
import { GuestDashboardComponent } from './components/guest-dashboard/guest-dashboard.component';
import { CourseDescriptionComponent } from './components/course-description/course-description.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { UserCourseDetailsComponent } from './components/user-course-details/user-course-details.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '', component: GuestDashboardComponent },
  // { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'instructorLogin', component: InstructorLoginComponent},
  { path: 'studentLogin', component: StudentLoginComponent},
  { path: 'instrDashboard', component: InstrDashboardComponent},
  { path: 'courseDescription', component: CourseDescriptionComponent},
  { path: 'courseDetails', component: CourseDetailsComponent},
  { path: 'userCourseDetails', component: UserCourseDetailsComponent},
  { path: 'studentDashboard/:email', component: StudentDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
              