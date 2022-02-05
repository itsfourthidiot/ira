import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  subscription: Subscription = new Subscription;
  type: string= "";

  constructor(private profile: ProfileService) { }

  ngOnInit(): void {
    this.subscription = this.profile.currentType.subscribe(
      type => this.type = type
    )
  }

}
