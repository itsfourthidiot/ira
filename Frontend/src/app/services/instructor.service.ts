import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of , EMPTY, BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators'
import { NONE_TYPE } from '@angular/compiler';

// var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"));

var AuthorizationString = "Bearer "+ localStorage.getItem("ACCESS_TOKEN")
var headers_object = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization' : AuthorizationString})


// var headers_object = new HttpHeaders()({
//   'Content-Type': 'application/json',
//   'Authorization': "Bearer "+ localStorage.getItem("ACCESS_TOKEN")
// });

const httpOptions = {
  headers: headers_object
}

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//   }),
// };

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  //private apiUrl = 'http://localhost:5000/instructor'
  // private apiUrl = "http://10.20.106.6:8080/instructor/"
  private apiUrl = "http://172.16.109.140:8080/instructor/"
  authSubject  =  new  BehaviorSubject(false);
  loginObject! : JSON

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any>{
    console.log("in service");
    console.log(username);
    console.log(password);

    var obj = {"email": username, "password": password};
    console.log(obj);
    

    // return this.http.post<any>(this.apiUrl, obj, httpOptions);
    return this.http.post<any>(this.apiUrl + "login", obj, httpOptions).pipe(
      tap((res) => {
        if (res){
          localStorage.setItem("ACCESS_TOKEN", res.token);
          // localStorage.set("ACCESS_TOKEN", res.token);
          this.authSubject.next(true);
        }
      })
    );


  }

  logOut(){
    localStorage.removeItem("ACCESS_TOKEN");
    this.authSubject.next(false);
    // return this.http.post<any>(this.apiUrl + "logout", null, httpOptions);
  }


}
