import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private sharedService : SharedService) { }

  defaultType = "guest";
  // private type = new BehaviorSubject(this.defaultType);
  // private email = new BehaviorSubject("")

  private type = new BehaviorSubject(this.sharedService.role)
  private email = new BehaviorSubject(this.sharedService.email)
  currentType = this.type.asObservable();
  currentEmail = this.email.asObservable();

  changeType(newType: string){
    this.type.next(newType);
  }

  changeEmail(newemail: string){
    this.email.next(newemail)
  }
}
