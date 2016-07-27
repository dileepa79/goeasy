import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Configuration} from '../app.constants';
import {FeedbackRequest} from '../feedback/feedback-request'
import {AuthService} from './auth.service';

@Injectable()
export class FeedbackService {
    private webApiUrl: string;
    constructor(private http: Http, private _authService: AuthService, private _configuration: Configuration) {
        this.webApiUrl = _configuration.ServerWithApiUrl + 'Feedback';
    }

    public sendFeedback( feedbackReq  ) { 
        console.log('Sending Feedback for');
        console.log(feedbackReq);

        var body = JSON.stringify(feedbackReq);
        console.log(body);

        var headers = this._authService.getHeader();
        headers.append('Content-Type', 'application/json; charset=utf-8');

        var options = new RequestOptions({ headers: headers });

        this.http.post(this.webApiUrl, body, options)
            .map(res => res.json())
            .subscribe(
            data => {
                console.log("Feedback Sent: " + data);
            },
            err => console.log("error: " + JSON.stringify(err)),
            () => {
                alert("Feedback submitted successfully");
            }
            );
    }
}