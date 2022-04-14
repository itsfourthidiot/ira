import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from 'src/app/services/auth.mock.service';
import { SharedService } from 'src/app/services/shared.service';



@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

  username!: string;
  password!: string;
  newUsername!: string;
  newPassword!: string;
  returnUrl!: string;

  // constructor(private instructorService: InstructorService, private router: Router) { }
  constructor(private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin(){

    console.log("login");
    var email = this.username
    //console.log(this.username + "--" + this.password);
    this.authService.login(this.username, this.password, "student").subscribe(
      (res) => {
        console.log("logged in successfully");
        this.sharedService.role = "student";
        if (this.returnUrl !== '/'){
          this.router.navigateByUrl(this.returnUrl);
        } else {
        
        console.log("before sending to user dashboard" + email);
        this.router.navigateByUrl(`/studentDashboard/${email}`);
        }
      }
      // this.router.navigateByUrl(`/studentDashboard/swara@gmail.com`);

    );

    this.username = '';
    this.password = '';
  }

  onLogout(){
    this.authService.logOut();
  }

  onRegister(){
    this.authService.register(this.newUsername, this.newPassword, "student").subscribe(
      (res) => {
        alert(res.email + " registered successfully");
      }
    )

    this.newUsername = '';
    this.newPassword = '';
  }



}
