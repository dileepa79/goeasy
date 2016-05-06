import {Injectable, Inject} from 'angular2/core';
import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Configuration} from '../app.constants';

@Injectable()
export class UserProfileService {
    constructor(private http: Http, private _configuration: Configuration) {
    }

    public getImage(externalReference) {
    }
}


