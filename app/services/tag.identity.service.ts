import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { TagIdentity } from '../tags/tags-response';
import {Configuration} from '../app.constants';
import {AuthService} from './auth.service';

@Injectable()
export class TagIdentityService {
    private webApiUrl: string;
    private authService: AuthService;
	
    constructor(private http: Http, private _authService: AuthService, private _configuration: Configuration) {
        this.webApiUrl = _configuration.ServerWithApiUrl + 'tagIdentity';
        this.authService = _authService;
    }
	
    public GetById(id) {
        return this.http.get(this.webApiUrl + "?id=" + id)
            .map(res => <any>res.json())
            //.do(data => console.log(data))
            .catch(this.handleError);
    }
	
    getTags() {
        var headers = this.authService.getHeader();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        return this.http.get(this.webApiUrl, options)
            .toPromise()
            .then(res => <any>res.json().data)
            .then(data => { return data; });
    }

    getAllTags() {
        var headers = this.authService.getHeader();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var options = new RequestOptions({ headers: headers });

        return this.http.get(this.webApiUrl, options)
            .map(res => <any>res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    public addTag(tagIdentityRequest){
        console.log("TagIdentity: " + tagIdentityRequest);

        var body = JSON.stringify(tagIdentityRequest);
		console.log('body:' + body);
        var headers = this.authService.getHeader();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var options = new RequestOptions({ headers: headers });

        return this.http.post(this.webApiUrl, body, options)
            .map(res => {
                // If request fails, throw an Error that will be caught
                if (res.status < 200 || res.status >= 300) {
                    throw new Error('This request has failed ' + res.status);
                } 
                // If everything went fine, return the response
                else {
                    return "ok"; //return <tagIdentity>res.json();
                }
            })
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}