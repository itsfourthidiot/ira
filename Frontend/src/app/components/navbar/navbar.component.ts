import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.mock.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  subscriptionType: Subscription = new Subscription;
  subscriptionEmail: Subscription = new Subscription
  type: string | null= "";
  email: string | null= "";


  constructor(
    private profile: ProfileService,
    private auth: AuthService,
    private router: Router,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.subscriptionType = this.profile.currentType.subscribe(
      type => this.type = type
    )
    this.subscriptionEmail = this.profile.currentEmail.subscribe(
      email => this.email = email
    )
    //this.subscriptionEmail = this.pro
  }

  logout(){    
    this.auth.logOut();
    this.router.navigateByUrl("/");
  }

  goToDashBoard(){
    this.router.navigateByUrl(`/studentDashboard/${this.email}`);
  }

}
