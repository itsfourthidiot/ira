import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
//import { AuthService } from 'src/app/services/auth.service';
import { AuthService } from 'src/app/services/auth.mock.service';
import { SharedService } from 'src/app/services/shared.service';



@Component({
  selector: 'app-instructor-login',
  templateUrl: './instructor-login.component.html',
  styleUrls: ['./instructor-login.component.css']
})
export class InstructorLoginComponent implements OnInit {

  username!: string;
  password!: string;
  newUsername!: string;
  newPassword!: string;

  // constructor(private instructorService: InstructorService, private router: Router) { }
  constructor(
    private authService: AuthService, 
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  onLogin(){
    //check if token is set
    //navigate to instructor dashboard

    console.log("login");
    this.authService.login(this.username, this.password, "instructor").subscribe(
      (res) => {
        alert("logged in successfully");
        this.sharedService.role = "instructor";
        this.router.navigateByUrl('instrDashboard');
      }
    );

    this.username = '';
    this.password = '';
  }

  onLogout(){
    this.authService.logOut();
  }

  onRegister(){
    this.authService.register(this.newUsername, this.newPassword, "instructor").subscribe(
      (res) => {
        alert(res.email + " registered successfully");
      }
    )

    this.newUsername = '';
    this.newPassword = '';
  }
}
