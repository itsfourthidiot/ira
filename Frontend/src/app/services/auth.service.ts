import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription , EMPTY, BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators'
import { NONE_TYPE } from '@angular/compiler';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { IAuthService } from './auth.service.interface';
import { apiUrls } from '../constants/apiConstants';
import { SharedService } from './shared.service';


var AuthorizationString = "Bearer "+ localStorage.getItem("ACCESS_TOKEN")
var headers_object = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization' : AuthorizationString})

const httpOptions = {
  headers: headers_object
}


@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  private apiUrl = apiUrls.baseUrl;

  // private apiUrl: string = "http://172.16.109.140:8080/instructor/"
  //private apiUrl: string = "http://172.16.109.140:8080/"
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  subscription: Subscription = new Subscription;
  type: string | null= "";
  constructor(
    private http: HttpClient,
    public router: Router,
    private profile: ProfileService,
    private sharedService: SharedService
  ) {
    this.subscription = this.profile.currentType.subscribe(
      type => this.type = type
    )
  }


  login(username: string, password: string, role: string): Observable<any>{
    console.log("in service");
    console.log(username);
    console.log(password);

    var obj = {"email": username, "password": password};
    console.log(obj);
    
  
    // return this.http.post<any>(this.apiUrl, obj, httpOptions);
    return this.http.post<any>(this.apiUrl + "/" + role + "/login", obj).pipe(
      tap((res) => {
        if (res){
          localStorage.setItem("ACCESS_TOKEN", res.token);
          localStorage.setItem("role", role);
          localStorage.setItem("email", username)
          this.sharedService.email = username
          this.profile.changeEmail(username)
          //change type according to logged in user
          this.profile.changeType(role);
          this.sharedService.role = role;
          // localStorage.set("ACCESS_TOKEN", res.token);
          // this.authSubject.next(true);
        }
      })
    );
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('ACCESS_TOKEN');
    return (authToken !== null) ? true : false;
  }

  getToken() {
    return localStorage.getItem('ACCESS_TOKEN');
  }

  logOut(){
    console.log("Logged out")
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    this.sharedService.role = "guest";
    this.sharedService.email = "";
    this.profile.changeType("guest");
    // this.authSubject.next(false);
    // return this.http.post<any>(this.apiUrl + "logout", null, httpOptions);
  }

  register(username: string, password: string, role: String): Observable<any>{

    var obj = {"email": username, "password": password};
    console.log(obj);

    console.log(this.apiUrl + "/register");
    return this.http.post<any>(this.apiUrl + "/" + role + "/register", obj);


  }

  getStudentDashBoard(username: string): Observable<any>{
    //let api = `${this.apiUrl}/student-dashboard/${username}`;
    let api = `${this.apiUrl}/student/courses`;
    return this.http.get(api);
  }


}
