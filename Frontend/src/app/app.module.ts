import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/authconfig.interceptor'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule} from  '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { InstructorLoginComponent } from './components/instructor-login/instructor-login.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { InstrDashboardComponent } from './components/instr-dashboard/instr-dashboard.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { StudentLoginComponent } from './components/student-login/student-login.component';
import { GuestDashboardComponent } from './components/guest-dashboard/guest-dashboard.component';
import { CourseDescriptionComponent } from './components/course-description/course-description.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { UserCourseDetailsComponent } from './components/user-course-details/user-course-details.component';
import { UserCourseDescriptionComponent } from './components/user-course-description/user-course-description.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InstructorLoginComponent,
    SearchBoxComponent,
    StudentLoginComponent,
    GuestDashboardComponent,
    CourseDescriptionComponent,
    CourseDetailsComponent,
    UserCourseDetailsComponent,
    UserCourseDescriptionComponent,
    InstrDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    MatAutocompleteModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
