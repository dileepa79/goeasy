import {Injectable, Inject} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {RecentTimeLineResponse} from '../recenttimeline/recenttimeline-response';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {TokenService} from './token.service';
import {Configuration} from '../app.constants';

@Injectable()
export class RecentTimeLineService {
    private webApiUrl: string;
    private recentTimelines: any[];
    private authService: AuthService

    constructor(private http: Http, private _authService: AuthService, private _configuration: Configuration) {
        this.webApiUrl = _configuration.ServerWithApiUrl + 'TagSearchRequest';
        this.authService = _authService;
    }

    public getRecentTimeLines() {
        var headers = this.authService.getHeader();
        return this.http.get(this.webApiUrl, {
            headers: headers
        })
            .map(res => <RecentTimeLineResponse[]>res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    public share(request) {
        //console.log("Title: " + request.title + ", description: " + request.description);

        var body = JSON.stringify(request);
        //var headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        var headers = this._authService.getHeader();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var options = new RequestOptions({ headers: headers });

        return this.http.post(this.webApiUrl, body, options)
            .map((res) => { return <AppUser[]>res.json() });
    }
}


