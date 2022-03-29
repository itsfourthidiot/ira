import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { CurriculumRoutingModule } from './curriculum-routing.module';

import { FileUploadComponent } from './file-upload/file-upload.component';
import { CurriculumComponent } from './curriculum.component';
import { QuizzComponent } from './quizz/quizz.component';

@NgModule({
  declarations: [
    FileUploadComponent,
    CurriculumComponent,
    QuizzComponent
  ],
  imports: [
    CommonModule,
    CurriculumRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class CurriculumModule { }
