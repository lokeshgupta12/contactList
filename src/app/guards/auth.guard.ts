import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from '../login.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService : LoginService
        ) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
        if (localStorage.getItem('token')) {
           return true;
        } else {
           return false;
        }

    }
}
