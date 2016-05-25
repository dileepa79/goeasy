import {Injectable} from '@angular/core';

@Injectable()
export class TokenService {
    private _token: string;
    public getToken() {
        return this._token;
    }
    public setToken(token: string) {
        this._token = token;
    }
    public removeToken() {
        this._token = "";
    }
}