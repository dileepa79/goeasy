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
    constructor(private _feedbackService: FeedbackService) {  }
    comment: string = "";

    sendFeedback(response: boolean) {
        var feedbackRequest = new FeedbackRequest();
       // var applicationViewId = (<HTMLInputElement>document.getElementById('application-view-id')).value;
        feedbackRequest.ApplicationViewKey = parseInt(this.getViewId());
        feedbackRequest.Liked = response;
        feedbackRequest.Comment = this.comment;
        this._feedbackService.sendFeedback(feedbackRequest);
        this.comment = "";
    }

    getViewId() {
        var location = window.location.hash.substring(1);
        var viewId;
        switch (location) {
            case "/dashboard":
                viewId = "1";
                break;
            case "/timeline":
                viewId = "2";
                break;
            case "/addnote":
                viewId = "0";
                break;
            default:
                viewId = "-1";
        }
        return viewId;
    }
}