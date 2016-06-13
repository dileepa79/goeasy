import {Injectable} from '@angular/core';


@Injectable()
export class TokenService {
    private _token: string;
    public getToken() {
        this._token = this.getCookie("yaytoken");
        return this._token;
    }
    public setToken(token: string) {
        this._token = token;
        this.setTokenToCookie(token, 14);
    }
    public getTokenFromCookie() {
        return this.getCookie("yaytoken");
    }
    public setTokenToCookie(token: string, expiredIn: number) {
        this.setCookie("yaytoken", token, expiredIn);
    }
    public removeToken() {
        this.delete_cookie("yaytoken");
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
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    delete_cookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

}