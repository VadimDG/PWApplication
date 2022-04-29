import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private readonly router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        const token = localStorage.getItem('token');
        if (!token) {
            this.router.navigateByUrl('/login');
            return false;
        }
        return true;
    }
}