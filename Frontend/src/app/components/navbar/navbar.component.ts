import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.mock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  subscription: Subscription = new Subscription;
  type: string= "";

  constructor(
    private profile: ProfileService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.profile.currentType.subscribe(
      type => this.type = type
    )
  }

  logout(){    
    this.auth.logOut();
    this.router.navigateByUrl("/");
  }

}
