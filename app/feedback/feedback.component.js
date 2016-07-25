System.register(['@angular/core', '../services/feedback.service', '../modal/modaldialog', '../feedback/feedback-request'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, feedback_service_1, modaldialog_1, feedback_request_1;
    var FeedbackComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (modaldialog_1_1) {
                modaldialog_1 = modaldialog_1_1;
            },
            function (feedback_request_1_1) {
                feedback_request_1 = feedback_request_1_1;
            }],
        execute: function() {
            FeedbackComponent = (function () {
                function FeedbackComponent(_feedbackService) {
                    this._feedbackService = _feedbackService;
                }
                FeedbackComponent.prototype.sendFeedback = function (response) {
                    var feedbackRequest = new feedback_request_1.FeedbackRequest();
                    var applicationViewId = document.getElementById('application-view-id').value;
                    feedbackRequest.ApplicationViewKey = parseInt(applicationViewId);
                    feedbackRequest.Liked = response;
                    feedbackRequest.Comment = this.comment;
                    this._feedbackService.sendFeedback(feedbackRequest);
                };
                FeedbackComponent = __decorate([
                    core_1.Component({
                        selector: 'user-feedback',
                        templateUrl: 'app/feedback/feedback.component.html',
                        directives: [modaldialog_1.MODAL_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [feedback_service_1.FeedbackService])
                ], FeedbackComponent);
                return FeedbackComponent;
            }());
            exports_1("FeedbackComponent", FeedbackComponent);
        }
    }
});
//# sourceMappingURL=feedback.component.js.map