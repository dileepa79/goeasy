import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {Configuration} from '../app.constants';
import {NotificationUpdate} from '../notifications/notificationUpdate'

@Injectable()
export class NotificationService {
    private webApiUrl: string;

    constructor(private http: Http, private _authService: AuthService, private _configuration: Configuration) {
        this.webApiUrl = _configuration.ServerWithApiUrl + 'Notification';
    }

    public getNotifications() {
        var headers = this._authService.getHeader();//new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        //var options = new RequestOptions({ headers: headers });
        return this.http.get(this.webApiUrl + '/' + 'GetNotifications', {
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

    public updateNotifications(id: number, isSnooze: boolean) {
        var notificationUpdate = new NotificationUpdate();
        var count = 0;
        notificationUpdate.NotificationId = id;
        notificationUpdate.IsSnooze = isSnooze;
        console.log('updating Notification for');
        console.log(notificationUpdate);

        var body = JSON.stringify(notificationUpdate);
        console.log(body);

        var headers = this._authService.getHeader();
        headers.append('Content-Type', 'application/json; charset=utf-8');

        var options = new RequestOptions({ headers: headers });

        return this.http.post(this.webApiUrl + '/' + 'UpdateNotifications', body, options)
            .map(res => res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    public dismissAll() {

        var body = JSON.stringify("");

        var headers = this._authService.getHeader();
        headers.append('Content-Type', 'application/json; charset=utf-8');

        var options = new RequestOptions({ headers: headers });

        return this.http.post(this.webApiUrl + '/' + 'DismissAllNotifications', body, options)
            .map(res => res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }
}