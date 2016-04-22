import {Injectable, Inject} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {TimeLineResponse} from '../timeline/timeline-response';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {TokenService} from './token.service'

@Injectable()
export class TimeLineService {
    constructor(private http: Http, private _authService: AuthService) {
    }

    public getTimeLines() {
        var header = this._authService.getHeader();
        return this.http.get('http://localhost:54736/api/TimeLine')
            .map(res => <TimeLineResponse[]>res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}


