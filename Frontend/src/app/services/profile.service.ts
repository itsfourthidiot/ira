import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  defaultType = "student";
  private type = new BehaviorSubject(this.defaultType);
  currentType = this.type.asObservable();

  changeType(newType: string){
    this.type.next(newType);
  }
}
