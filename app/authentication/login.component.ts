import {Component, Inject, forwardRef, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router} from '@angular/router';
import {AppComponent} from '../app.component';

export class UserDetails {
    username: string;
    password: string;
    rememberMe: boolean;
}

@Component({
    selector: 'login',
    templateUrl: '../app/authentication/login.component.html',
    providers: [
        AuthService
    ],
    styles: [' .login-content { height: 100vh; position: fixed; left:0; top: 0; margin-bottom: 110px;}','.login-logo { padding: 33vh 0 0 0;}'],
})

export class LoginComponent implements OnInit {
    showLoginHtml: boolean = false;
    constructor(private _authService: AuthService, @Inject(forwardRef(() => AppComponent)) private _parent: AppComponent) {
    }
    ngOnInit() {
        if (this._authService.loginUsingCookies() == false) {
            this.showLoginHtml = true;
            return;
        }
    }
    public userDetails: UserDetails = {
        username: '',
        password: '',
        rememberMe: false
    };
    public errorMsg = '';

    login() {
        this.errorMsg = '';
        this._authService.login(this.userDetails.username, this.userDetails.password, this.userDetails.rememberMe).subscribe(
            data => {
                //console.log("access token: "+data.access_token)
                this._authService.setToken(data.access_token);
                this._authService.setTokenExpiresIn(data.expires_in);
            },
            err => {
                console.log("error: " + JSON.stringify(err));
                this._authService.setAuthorized(false);
                this.errorMsg = 'Oops, the username or password entered is wrong. May be you have pressed a wrong key..';
                //alert(JSON.parse(err._body).error_description);
            },
            () => {
                this.errorMsg = '';
                this._authService.setCookies(this.userDetails.username, this.userDetails.password, this.userDetails.rememberMe);
            }
        );
    }

    getValues() {
        this._authService.get('http://localhost:18077/api/values', function (data) {
            console.log(JSON.stringify(data));
        });
    }
}