import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Configuration} from '../app.constants';
import {FeedbackRequest} from '../feedback/feedback-request'

@Injectable()
export class FeedbackService {
    private webApiUrl: string;
    constructor(private http: Http, private _configuration: Configuration) {
        this.webApiUrl = _configuration.ServerWithApiUrl + 'Feedback';
    }

    public sendFeedback(applicationViewId:string, liked: boolean) {
        var feedbackRequest = new FeedbackRequest();
        feedbackRequest.ApplicationViewKey = parseInt(applicationViewId);
        feedbackRequest.Liked = liked;
        console.log('Sending Feedback for');
        console.log(feedbackRequest);

        var body = JSON.stringify(feedbackRequest);
        console.log(body);

        var headers = new Headers();
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