import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorLoginComponent } from './components/instructor-login/instructor-login.component';
import { StudentLoginComponent } from './components/student-login/student-login.component';
import { AuthGuard } from './services/auth.guard'


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  // { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'instructorLogin', component: InstructorLoginComponent},
  { path: 'studentLogin', component: StudentLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
              