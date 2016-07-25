import {Component, OnInit, Inject, Input} from '@angular/core';
import {FeedbackService} from '../services/feedback.service';
import { MODAL_DIRECTIVES } from '../modal/modaldialog';
import {FeedbackRequest} from '../feedback/feedback-request'

@Component({
    selector: 'user-feedback',
    templateUrl: 'app/feedback/feedback.component.html',
    directives: [MODAL_DIRECTIVES]
})
export class FeedbackComponent {
    constructor(private _feedbackService: FeedbackService) { }
    comment: string;

    sendFeedback(response: boolean) {
        var feedbackRequest = new FeedbackRequest();
        var applicationViewId = (<HTMLInputElement>document.getElementById('application-view-id')).value;
        feedbackRequest.ApplicationViewKey = parseInt(applicationViewId);
        feedbackRequest.Liked = response;
        feedbackRequest.Comment = this.comment;
        this._feedbackService.sendFeedback(feedbackRequest);
    }
}