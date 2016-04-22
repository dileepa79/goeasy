import {Component, Inject, forwardRef} from 'angular2/core';
import {AuthService} from '../services/auth.service';
import { Router} from 'angular2/router';

export class UserDetails {
    username: string;
    password: string;
}

@Component({
    selector: 'login',
    templateUrl: '../app/authentication/login.component.html',
    providers: [
        AuthService
    ]
})

export class LoginComponent {
    constructor(private _authService: AuthService) {
    }
    public userDetails: UserDetails = {
        username: 'test@test.com',
        password: 'teST@123'
    };

    login() {
        this._authService.login(this.userDetails.username, this.userDetails.password);
    }
    getValues() {
        this._authService.get('http://localhost:18077/api/values', function (data) {
            console.log(JSON.stringify(data));
        });
    }
}