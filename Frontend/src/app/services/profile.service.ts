import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  defaultType = "guest";
  private type = new BehaviorSubject(this.defaultType);
  private email = new BehaviorSubject("")
  currentType = this.type.asObservable();
  currentEmail = this.email.asObservable();

  changeType(newType: string){
    this.type.next(newType);
  }

  changeEmail(newemail: string){
    this.email.next(newemail)
  }
}
