import {Component, OnInit, Inject} from 'angular2/core';
import {FeedbackService} from '../services/feedback.service'

@Component({
    selector: 'user-feedback',
    templateUrl: 'app/feedback/feedback.component.html',
})
export class FeedbackComponent {
    constructor(private _feedbackService: FeedbackService) {  }

    sendFeedback(response:boolean) {
        var applicationViewId = (<HTMLInputElement>document.getElementById('application-view-id')).value;
        this._feedbackService.sendFeedback(applicationViewId, response);
    }
}