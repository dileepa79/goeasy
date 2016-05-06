import {Injectable, Inject} from 'angular2/core';
import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import { TimeLineWatch } from '../shared/timeline-watch';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {TokenService} from './token.service';
import {Configuration} from '../app.constants';

@Injectable()
export class TimeLineWatchService {
    private webApiUrl: string;
    private authService: AuthService
    constructor(private http: Http, private _authService: AuthService, private _configuration: Configuration) {
        this.webApiUrl = _configuration.ServerWithApiUrl + 'TimeLineWatcher';
        this.authService = _authService;
    }

    public updateTimelineWatch(timeLineWatch) {

        var body = JSON.stringify(timeLineWatch);
        var headers = this.authService.getHeader();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var options = new RequestOptions({ headers: headers });

        return this.http.post(this.webApiUrl, body, options)
            .map(res => <any>res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}