import {Component, Inject, forwardRef, OnInit} from 'angular2/core';
import {AuthService} from '../services/auth.service';
import { Router} from 'angular2/router';

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
    ]
})

export class LoginComponent implements OnInit {
    constructor(private _authService: AuthService) {
    }
    ngOnInit() {
        if (!this._authService.loginUsingCookies()) return;
    }
    public userDetails: UserDetails = {
        username: '',
        password: '',
        rememberMe: false
    };

    login() {
        this._authService.login(this.userDetails.username, this.userDetails.password, this.userDetails.rememberMe);
    }
    getValues() {
        this._authService.get('http://localhost:18077/api/values', function (data) {
            console.log(JSON.stringify(data));
        });
    }
}