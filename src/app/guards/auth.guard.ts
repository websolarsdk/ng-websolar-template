import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@websolar/ng-websolar';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _authService: AuthService, private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this._authService.getToken()) {

            if (state.root.queryParams && state.root.queryParams["token"]) {
                const token = state.root.queryParams["token"];
                this._authService.setToken(token)
                return true;
            }

            // redirect user to host page
            this._router.navigate(['/host']);

            return false;
        }

        return true;
    }

}
