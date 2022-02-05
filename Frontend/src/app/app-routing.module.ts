import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorLoginComponent } from './components/instructor-login/instructor-login.component';
import { StudentLoginComponent } from './components/student-login/student-login.component';
import { AuthGuard } from './services/auth.guard'
import { InstrDashboardComponent } from './components/instr-dashboard/instr-dashboard.component';
import { GuestDashboardComponent } from './components/guest-dashboard/guest-dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '', component: GuestDashboardComponent },
  // { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'instructorLogin', component: InstructorLoginComponent},
  { path: 'studentLogin', component: StudentLoginComponent},
  { path: 'instrDashboard', component: InstrDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
              