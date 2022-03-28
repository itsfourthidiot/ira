import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, 
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';
import { AuthService } from 'src/app/services/auth.mock.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.authService.isLoggedIn !== true) {
    //   window.alert("Access not allowed!");
    //   this.router.navigate(['log-in'])
    // }
    // return true;
    if (this.authService.isLoggedIn){
      return true;
    } else {
      this.router.navigate(['studentLogin'], {queryParams: {returnUrl : state.url}})
      return false;
    }
  }
}