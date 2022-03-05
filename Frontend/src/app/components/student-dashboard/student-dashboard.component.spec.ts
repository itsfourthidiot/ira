import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { StudentDashboardComponent } from './student-dashboard.component';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";



describe('StudentDashboardComponent', () => {
  let component: StudentDashboardComponent;
  let fixture: ComponentFixture<StudentDashboardComponent>;
  let authService: AuthService;
  let route: ActivatedRoute;
  // let dataServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['login', 'isLoggedIn', 'getToken', 'logOut', 'register', 'getStudentDashBoard'])
    await TestBed.configureTestingModule({
      // imports: [
      //   AuthService,
      //   ActivatedRoute
      // ],
      declarations: [ StudentDashboardComponent ],
      providers : [
        {provide: ActivatedRoute, useValue: {
          params: Rx.of({email: 'nikhil@gmail.com'})
        }},
        { provide: AuthService, useValue:{
          getStudentDashBoard: () => (
            {
              "courses": [
                  {
                      "ID": 1,
                      "CreatedAt": "2022-02-21T18:57:52.136246883-05:00",
                      "UpdatedAt": "2022-02-21T19:00:30.266110218-05:00",
                      "DeletedAt": null,
                      "title": "SE",
                      "description": "welcome!",
                      "isPublished": false,
                      "publishedAt": null,
                      "instructorId": 1,
                      "Enrollments": null
                  },
                  {
                      "ID": 2,
                      "CreatedAt": "2022-02-23T16:48:26.772784446-05:00",
                      "UpdatedAt": "2022-03-03T23:30:24.502333169-05:00",
                      "DeletedAt": null,
                      "title": "DBI",
                      "description": "welcome! gauri is here",
                      "isPublished": false,
                      "publishedAt": null,
                      "instructorId": 3,
                      "Enrollments": null
                  },
                  {
                      "ID": 3,
                      "CreatedAt": "2022-02-23T16:48:34.753837183-05:00",
                      "UpdatedAt": "2022-02-23T19:04:31.813891136-05:00",
                      "DeletedAt": null,
                      "title": "Neural",
                      "description": "welcome!course3",
                      "isPublished": false,
                      "publishedAt": null,
                      "instructorId": 3,
                      "Enrollments": null
                  }
              ]
          }
          )
        }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService)
    fixture.detectChanges();
  });

  it('should load student dashboard', () => {
    spyOn(authService, 'getStudentDashBoard')
    .and
    .callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(authService.getStudentDashBoard).toHaveBeenCalledWith('nikhil@gmail.com');
    console.log(component.currentStudentDb)
  //   expect(component.currentStudentDb).toEqual({
  //     "courses": [
  //         {
  //             "ID": 1,
  //             "CreatedAt": "2022-02-21T18:57:52.136246883-05:00",
  //             "UpdatedAt": "2022-02-21T19:00:30.266110218-05:00",
  //             "DeletedAt": null,
  //             "title": "SE",
  //             "description": "welcome!",
  //             "isPublished": false,
  //             "publishedAt": null,
  //             "instructorId": 1,
  //             "Enrollments": null
  //         },
  //         {
  //             "ID": 2,
  //             "CreatedAt": "2022-02-23T16:48:26.772784446-05:00",
  //             "UpdatedAt": "2022-03-03T23:30:24.502333169-05:00",
  //             "DeletedAt": null,
  //             "title": "DBI",
  //             "description": "welcome! gauri is here",
  //             "isPublished": false,
  //             "publishedAt": null,
  //             "instructorId": 3,
  //             "Enrollments": null
  //         },
  //         {
  //             "ID": 3,
  //             "CreatedAt": "2022-02-23T16:48:34.753837183-05:00",
  //             "UpdatedAt": "2022-02-23T19:04:31.813891136-05:00",
  //             "DeletedAt": null,
  //             "title": "Neural",
  //             "description": "welcome!course3",
  //             "isPublished": false,
  //             "publishedAt": null,
  //             "instructorId": 3,
  //             "Enrollments": null
  //         }
  //     ]
  // });


  })





});
