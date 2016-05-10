"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var recenttimeline_service_1 = require('../services/recenttimeline.service');
var timeline_watch_service_1 = require('../services/timeline-watch.service');
var timeline_component_1 = require('../timeline/timeline.component');
var sharetimeline_component_1 = require('../sharetimeline/sharetimeline.component');
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var RecentTimeLineComponent = (function () {
    function RecentTimeLineComponent(_timeLineService, _timeLineWatchService, _router) {
        this._timeLineService = _timeLineService;
        this._timeLineWatchService = _timeLineWatchService;
        this._router = _router;
        // @ViewChild('parentModal')
        //parentModal: ModalComponent;
        this.animation = true;
        this.keyboard = true;
        this.backdrop = true;
        this.title = "RECENT TIMELINE";
        this.timeLineWatch = {
            tags: [],
            isWatched: false,
            isStatusUpdate: false
        };
        this.tags = '';
    }
    RecentTimeLineComponent.prototype.ngOnInit = function () {
        this.getRecentTimelines();
    };
    RecentTimeLineComponent.prototype.getRecentTimelines = function () {
        var _this = this;
        this._timeLineService.getRecentTimeLines()
            .subscribe(function (timelines) {
            _this.recentTimelines = timelines;
            console.log(_this.recentTimelines);
        }, function (error) {
            _this.errorMessage = error,
                console.log(_this.errorMessage);
        }, function () { return function () { return console.log("Done"); }; });
    };
    RecentTimeLineComponent.prototype.updateTimelineWatch = function (timeLineWatch, selectedTimeline) {
        var _this = this;
        this._timeLineWatchService.updateTimelineWatch(timeLineWatch)
            .subscribe(function (watch) {
            _this.timeLineWatch = watch;
            var selected = _this.recentTimelines.filter(function (obj) {
                return obj.id == selectedTimeline.id;
            });
            selected[0].isWatched = _this.timeLineWatch.isWatched;
        }, function (error) {
            _this.errorMessage = error,
                console.log(_this.errorMessage);
        }, function () { return function () { return console.log("Done"); }; });
    };
    RecentTimeLineComponent.prototype.select = function (selectedTimeline) {
        for (var i = 0; i < selectedTimeline.tags.length; i++) {
            this.tags = this.tags + (selectedTimeline.tags[i].name + (selectedTimeline.tags.length != i + 1 ? ',' : ''));
        }
        this._router.navigate(['TimeLine', { tags: this.tags }]);
    };
    RecentTimeLineComponent.prototype.openModal = function (timeline) {
        this.selectedTimeline = timeline;
        //this.parentModal.open()
    };
    RecentTimeLineComponent.prototype.watch = function (selectedTimeline) {
        var timeLineWatch = {
            tags: [],
            isWatched: false,
            isStatusUpdate: false
        };
        timeLineWatch.isWatched = selectedTimeline.isWatched;
        timeLineWatch.isStatusUpdate = true;
        timeLineWatch.tags = selectedTimeline.tags.map(function (d) { return d['name']; });
        this.updateTimelineWatch(timeLineWatch, selectedTimeline);
    };
    RecentTimeLineComponent = __decorate([
        core_1.Component({
            selector: 'recentimeline',
            templateUrl: './app/recenttimeline/recenttimeline.component.html',
            providers: [
                recenttimeline_service_1.RecentTimeLineService, timeline_watch_service_1.TimeLineWatchService
            ],
            directives: [timeline_component_1.TimeLineComponent, ng2_bs3_modal_1.MODAL_DIRECTIVES, sharetimeline_component_1.ShareTimelineComponent]
        })
    ], RecentTimeLineComponent);
    return RecentTimeLineComponent;
}());
exports.RecentTimeLineComponent = RecentTimeLineComponent;
//# sourceMappingURL=recenttimeline.component.js.map