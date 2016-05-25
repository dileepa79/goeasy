import {Injectable, Inject} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Configuration} from '../app.constants';
import {AuthService} from './auth.service';

@Injectable()
export class UserProfileService {
    private webApiUrl: string;
    private authService: AuthService;
    constructor(private http: Http, private _configuration: Configuration, private _authService: AuthService) {
        this.webApiUrl = _configuration.ServerWithApiUrl + 'Account/GetUserProfile';
        this.authService = _authService;
    }

    public getUserProfile() {
        var headers = this.authService.getHeader();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        
        return this.http.get(this.webApiUrl, {
            headers: headers
        })
            .map(res => <any>res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    public getImage(externalReference) {
        return this.http.get(this._configuration.ServerWithApiUrl + "FileContent/GetFileContent?externalReference=" + externalReference)
            .map(res => <any>res.json())
            //.do(data => console.log(data))
            .catch(this.handleError);
    }
}


