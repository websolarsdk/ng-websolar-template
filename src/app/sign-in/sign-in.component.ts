import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { AuthService, NotifyService } from '@websolar/ng-websolar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

    public isLoading = false;

    public username = "";

    public password = "";

    constructor(
        private _matDialog: MatDialog,
        private _dialogRef: MatDialogRef<SignInComponent>,
        private _notify: NotifyService,
        private _auth: AuthService
    ) { }


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
            this._dialogRef.close(true);
        }
        catch (err) {
            this._notify.error(err);
        }
        finally {
            this.isLoading = false;
        }
    }



}
