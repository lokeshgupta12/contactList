import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable()

export class LoginResolver implements Resolve<any> {
	
	constructor(private router : Router) {}

	resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) {
		if (!localStorage.getItem('token')) 
			return true;
		this.router.navigate(['home']);
	}
}