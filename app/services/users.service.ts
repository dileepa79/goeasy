import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Configuration} from '../app.constants';
import {AuthService} from './auth.service';


@Injectable()
export class UsersService {
    private webApiUrl: string;
    private authService: AuthService;

    constructor(private http: Http, private _authService: AuthService, private _configuration: Configuration) {
        this.webApiUrl = _configuration.ServerWithApiUrl + 'ApplicationUser';
        this.authService = _authService;
    }

    getUsers() {
        var headers = this.authService.getHeader();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        return this.http.get(this.webApiUrl, options)
            .toPromise()
            .then(res => <any>res.json().users)
            .then(users => { return users; });
    }

    /*
    public addUser(applicationUserRequest): Observable<applicationUser> {
        console.log("applicationUserRequest: " + applicationUserRequest);

        var body = JSON.stringify(applicationUserRequest);
        var headers = this.authService.getHeader();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:54736/api/tag', body, options)
            .map(res => {
                // If request fails, throw an Error that will be caught
                if (res.status < 200 || res.status >= 300) {
                    throw new Error('This request has failed ' + res.status);
                }
                // If everything went fine, return the response
                else {
                    return <Tag>res.json();
                }
            })
            .do(data => console.log(data))
            .catch(this.handleError);
    }*/



}