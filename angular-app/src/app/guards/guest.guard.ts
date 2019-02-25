import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class GuestGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuth = this.authService.isAuth();

    if(isAuth){
      this.router.navigate(['/categories/list']);
    }

    return true;
  }
}
