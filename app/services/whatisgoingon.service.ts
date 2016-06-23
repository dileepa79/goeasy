import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers, RequestOptions,URLSearchParams} from '@angular/http';
import {WhatIsGoingOnResponse} from '../whatisgoingon/whatisgoingon-response';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {TokenService} from './token.service';
import {Configuration} from '../app.constants';

@Injectable()
export class WhatIsGoingOnService {
    private webApiUrl: string;
    private recentTimelines: any[];
    private authService: AuthService;

    constructor(private http: Http, private _authService: AuthService, private _configuration: Configuration) {
        this.webApiUrl = _configuration.ServerWithApiUrl + 'ActivityLog';
        this.authService = _authService;
    }

    public getWhatisGoingOnActivity(whatIsGoingOnRequest) {
        var headers = this.authService.getHeader();
        var options = new RequestOptions({
            headers: headers,
            search: new URLSearchParams('PageNo=' + whatIsGoingOnRequest.pageNo + '&PageSize=' + whatIsGoingOnRequest.pageSize)
        });
        
        return this.http.get(this.webApiUrl, options)
            .map(res => <WhatIsGoingOnResponse[]>res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}