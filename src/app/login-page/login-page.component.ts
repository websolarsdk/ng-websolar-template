import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from 'ng-websolar';
import { AuthService } from 'ng-websolar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent  {
  
    public isLoading = false;

    public username = "";

    public password = "";

    constructor(
        private _router: Router,
        private _auth: AuthService,
        private _notify: NotifyService,
        private _ngZone: NgZone
    ) { }


    public async signUp() {
       alert("SIGN UP")
    }

    public isCanSignIn() {
        if (!this.username ||
            !this.password ||
            this.isLoading) {
            return false;
        }
        return true;
    }

    public async signIn() {
        try {
            if (!this.username || !this.password) {
                return;
            }
            this.isLoading = true;
            await this._auth.signIn({
                username: this.username,
                password: this.password
            });

            // NOTE: You can save the token in cookies for future use

            this._router.navigate(["/projects"]);
        }
        catch (err) {
            this._notify.error(err);
        }
        finally {
            this.isLoading = false;
        }
    }

 

    public async forgotPassword() {
        alert("FORGOT PASSWORD")
    }

}
