import {Component, provide, Injector, Inject, forwardRef, Optional, Injectable, Host} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import { Router} from 'angular2/router';
import {TokenService} from './token.service';
import {LoginComponent} from '../authentication/login.component';
import {AppComponent} from '../app.component';
import {Configuration} from '../app.constants';

@Injectable()
export class AuthService {
    private _token: string;
    private webApiUrl: string;
    constructor(public _router: Router, private http: Http, private tokenService: TokenService, private _configuration: Configuration, @Inject(forwardRef(() => AppComponent)) private _parent: AppComponent) {
        this._token = '';
        this.webApiUrl = _configuration.Server + 'Token';
    }
    public login(username, password, rememberMe) {
        console.log("username: " + username + ", password: " + password + ", remember me: "+rememberMe);

        var _username = 'test@test.com';
        var _password = 'teST@123';
        var grant_type = 'password';

        var creds = "grant_type=" + grant_type + "&userName=" + username + "&password=" + password;

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post(this.webApiUrl, creds, {
            headers: headers
        })
            .map(res => res.json())
            .subscribe(
            data => {
                //console.log("access token: "+data.access_token)
                this._token = data.access_token;
            },
            err => {
                console.log("error: " + JSON.stringify(err));
                this._parent.isAuthorized = false;
                alert(JSON.parse(err._body).error_description);
            },
            () => {
                this.tokenService.setToken(this._token);
                this._parent.isAuthorized = true;
                if (rememberMe) {
                    console.log("saving credentials in cookie");
                    //document.cookie = "username=" + username;
                    //document.cookie = "password=" + password;
                    this.setCookie("username", username, 15);
                    this.setCookie("password", password, 15);
                }
                this._router.navigate(['TimeLine']);
            }
            );
    }
    isAuth() {
        return this.tokenService.getToken() != '' && this.tokenService.getToken() != null;
    }
    get(url, callback) {        
        var authHeader = new Headers();
        authHeader.append('Authorization', 'bearer ' + this._token);
        this.http.get(url, {
            headers: authHeader
        })
            .map(res => res.text())
            .subscribe(
            data => callback(data),
            err => console.log("error: " + JSON.stringify(err)),
            () => console.log('Secret Quote Complete')
            );
    }
    getHeader() {
        var authHeader = new Headers();
        authHeader.append('Authorization', 'bearer ' + this.tokenService.getToken());
        return authHeader;
    }
    setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    loginUsingCookies() {
        var userName = this.getCookie("username");
        var password = this.getCookie("password");
        if (userName == null || userName == '' || password == null || password == '') return false;
        this.login(userName, password, true);
    }
    getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
    }
    logout() {
        console.log("logout");
        this.tokenService.removeToken();
        this.delete_cookie("username");
        this.delete_cookie("password");
        this._parent.isAuthorized = false;
        this._router.navigate(['Login']);
    }
    delete_cookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}