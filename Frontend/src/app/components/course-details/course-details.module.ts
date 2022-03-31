import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';

import { CourseDetailsRoutingModule } from './course-details-routing.module';
import { CourseDescriptionComponent } from './course-description/course-description.component';
import { CourseDetailsComponent } from './course-details.component';
import { ModuleComponent } from './module/module.component';

@NgModule({
  declarations: [
    CourseDetailsComponent,
    CourseDescriptionComponent,
    ModuleComponent
  ],
  imports: [
    CommonModule,
    CourseDetailsRoutingModule,
    FormsModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class CourseDetailsModule { }
