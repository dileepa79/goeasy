import {Component, OnInit, Inject} from 'angular2/core';
import {FeedbackService} from '../services/feedback.service';
import { MODAL_DIRECTIVES } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'user-feedback',
    templateUrl: 'app/feedback/feedback.component.html',
    directives: [MODAL_DIRECTIVES]
})
export class FeedbackComponent {
    constructor(private _feedbackService: FeedbackService) {  }

    sendFeedback(response:boolean) {
        var applicationViewId = (<HTMLInputElement>document.getElementById('application-view-id')).value;
        this._feedbackService.sendFeedback(applicationViewId, response);
    }
}