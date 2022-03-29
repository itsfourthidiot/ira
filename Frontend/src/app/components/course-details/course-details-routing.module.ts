import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './course-details.component';
import { CourseDescriptionComponent } from './course-description/course-description.component';

const routes: Routes = [
  {
    path: '', component: CourseDetailsComponent, children: [
      {
        path: 'description', component: CourseDescriptionComponent
      },
      {
        path: 'curriculum', loadChildren: () => import(`./curriculum/curriculum.module`).then(m => m.CurriculumModule)
      },
      {
        path: '', redirectTo: 'description', pathMatch: 'full'
      }
      // { path: '**', component: Page404leavesComponent }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseDetailsRoutingModule { }
