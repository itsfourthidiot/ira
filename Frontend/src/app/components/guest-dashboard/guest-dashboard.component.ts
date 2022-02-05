import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guest-dashboard',
  templateUrl: './guest-dashboard.component.html',
  styleUrls: ['./guest-dashboard.component.css']
})
export class GuestDashboardComponent implements OnInit {

  type: string = "";
  subscription: Subscription = new Subscription();

  constructor(private profile: ProfileService) { }

  ngOnInit(): void {
    this.profile.changeType("guest");
  }

}
