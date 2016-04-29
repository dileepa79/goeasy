import {Injectable, Inject} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {Configuration} from '../app.constants';

@Injectable()
export class NotificationService {
    private webApiUrl: string;

    constructor(private http: Http, private _authService: AuthService, private _configuration: Configuration) {
        this.webApiUrl = _configuration.ServerWithApiUrl + 'Notification';
        console.log('not cons');
    }

    public getNotifications() {
        var headers = this._authService.getHeader();//new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        //var options = new RequestOptions({ headers: headers });
        return this.http.get(this.webApiUrl, {
            headers: headers
        })
            .map(res => <any>res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
          
    }

    private handleError(error: Response) {
        console.error('notifi err ' + error);
        return Observable.throw(error.json().error || 'Server error');
    }




}