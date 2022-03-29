import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurriculumComponent } from './curriculum.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { QuizzComponent } from './quizz/quizz.component';

const routes: Routes = [
  {
    path: '', component: CurriculumComponent, children: [
      {
        path: 'videoUpload', component: FileUploadComponent
      },
      {
        path: 'quizz', component: QuizzComponent
      }
      // { path: '**', component: Page404leavesComponent }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurriculumRoutingModule { }
