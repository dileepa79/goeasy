import {Component, OnInit, Inject} from '@angular/core';
import {FeedbackService} from '../services/feedback.service';
import { MODAL_DIRECTIVES } from '../modal/modaldialog';

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