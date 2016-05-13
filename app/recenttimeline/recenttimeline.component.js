System.register(['angular2/core', '../services/recenttimeline.service', '../services/timeline-watch.service', '../timeline/timeline.component', '../sharetimeline/sharetimeline.component', 'angular2/router', '../noteshareusers/users-selector.component', 'ng2-bs3-modal/ng2-bs3-modal', '../carousel/carousel.component'], function(exports_1, context_1) {
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
    var core_1, recenttimeline_service_1, timeline_watch_service_1, timeline_component_1, sharetimeline_component_1, router_1, users_selector_component_1, ng2_bs3_modal_1, carousel_component_1;
    var RecentTimeLineComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (recenttimeline_service_1_1) {
                recenttimeline_service_1 = recenttimeline_service_1_1;
            },
            function (timeline_watch_service_1_1) {
                timeline_watch_service_1 = timeline_watch_service_1_1;
            },
            function (timeline_component_1_1) {
                timeline_component_1 = timeline_component_1_1;
            },
            function (sharetimeline_component_1_1) {
                sharetimeline_component_1 = sharetimeline_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (users_selector_component_1_1) {
                users_selector_component_1 = users_selector_component_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (carousel_component_1_1) {
                carousel_component_1 = carousel_component_1_1;
            }],
        execute: function() {
            RecentTimeLineComponent = (function () {
                function RecentTimeLineComponent(_timeLineService, _timeLineWatchService, _router) {
                    this._timeLineService = _timeLineService;
                    this._timeLineWatchService = _timeLineWatchService;
                    this._router = _router;
                    // @ViewChild('parentModal')
                    //parentModal: ModalComponent;
                    this.animation = true;
                    this.keyboard = true;
                    this.backdrop = true;
                    this.users = [];
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
                RecentTimeLineComponent.prototype.setCurrentTimeline = function (_selectedTimeline) {
                    this.currentTimeline_id = _selectedTimeline.id;
                };
                RecentTimeLineComponent.prototype.onSelectedUsersChanged = function (_users) {
                    this.users = _users.map(function (d) { return d['userName']; });
                };
                RecentTimeLineComponent.prototype.shareTimeline = function () {
                    var timeline_share = {
                        TimeLineId: this.currentTimeline_id,
                        AppUsers: this.users
                    };
                    this._timeLineService.share(timeline_share);
                };
                RecentTimeLineComponent = __decorate([
                    core_1.Component({
                        selector: 'recentimeline',
                        templateUrl: './app/recenttimeline/recenttimeline.component.html',
                        //css
                        styles: ['.wrapper{width: 1%;margin: 2px auto;}'],
                        providers: [
                            recenttimeline_service_1.RecentTimeLineService, timeline_watch_service_1.TimeLineWatchService
                        ],
                        directives: [timeline_component_1.TimeLineComponent, ng2_bs3_modal_1.MODAL_DIRECTIVES, sharetimeline_component_1.ShareTimelineComponent, users_selector_component_1.UsersSelectorComponent, carousel_component_1.CSSCarouselComponent]
                    }), 
                    __metadata('design:paramtypes', [recenttimeline_service_1.RecentTimeLineService, timeline_watch_service_1.TimeLineWatchService, router_1.Router])
                ], RecentTimeLineComponent);
                return RecentTimeLineComponent;
            }());
            exports_1("RecentTimeLineComponent", RecentTimeLineComponent);
        }
    }
});
//# sourceMappingURL=recenttimeline.component.js.map