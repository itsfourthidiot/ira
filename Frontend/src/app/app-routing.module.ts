import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorLoginComponent } from './components/instructor-login/instructor-login.component';
import { StudentLoginComponent } from './components/student-login/student-login.component';
import { InstrDashboardComponent } from './components/instr-dashboard/instr-dashboard.component';
import { GuestDashboardComponent } from './components/guest-dashboard/guest-dashboard.component';
import { UserCourseDetailsComponent } from './components/user-course-details/user-course-details.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '', component: GuestDashboardComponent },
  { path: 'instructorLogin', component: InstructorLoginComponent},
  { path: 'studentLogin', component: StudentLoginComponent},
  { path: 'instrDashboard', component: InstrDashboardComponent},
  { path: 'courseDetails/:courseID', loadChildren: () => import(`./components/course-details/course-details.module`).then(m => m.CourseDetailsModule)},
  { path: 'userCourseDetails', component: UserCourseDetailsComponent},
  { path: 'studentDashboard/:email', component: StudentDashboardComponent},
  { path: 'userCourseDetails', component: UserCourseDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
              