System.register(['@angular/core', '../services/recenttimeline.service', '../services/timeline-watch.service', '../timeline/timeline.component', '../sharetimeline/sharetimeline.component', '@angular/router', '../noteshareusers/users-selector.component', '../modal/modaldialog', '../carousel/carousel.component', '../recenttimeline/recenttimeline.watchfilter.component', '../timeline/angular2-infinite-scroll'], function(exports_1, context_1) {
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
    var core_1, recenttimeline_service_1, timeline_watch_service_1, timeline_component_1, sharetimeline_component_1, router_1, users_selector_component_1, modaldialog_1, carousel_component_1, recenttimeline_watchfilter_component_1, angular2_infinite_scroll_1;
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
            function (modaldialog_1_1) {
                modaldialog_1 = modaldialog_1_1;
            },
            function (carousel_component_1_1) {
                carousel_component_1 = carousel_component_1_1;
            },
            function (recenttimeline_watchfilter_component_1_1) {
                recenttimeline_watchfilter_component_1 = recenttimeline_watchfilter_component_1_1;
            },
            function (angular2_infinite_scroll_1_1) {
                angular2_infinite_scroll_1 = angular2_infinite_scroll_1_1;
            }],
        execute: function() {
            // Import the Image interface
            //import {Image} from '../image.interface';
            RecentTimeLineComponent = (function () {
                function RecentTimeLineComponent(_timeLineService, _timeLineWatchService, _router) {
                    this._timeLineService = _timeLineService;
                    this._timeLineWatchService = _timeLineWatchService;
                    this._router = _router;
                    // @ViewChild('parentModal')
                    //parentModal: ModalComponent;
                    this.images = [
                        { "title": "", "url": "img/profile-pics/finn.png" },
                        { "title": "", "url": "img/profile-pics/anu.png" },
                        { "title": "", "url": "img/profile-pics/chinthaka.png" },
                        { "title": "", "url": "img/profile-pics/twi.png" },
                        { "title": "", "url": "img/profile-pics/waruni.png" },
                        { "title": "", "url": "img/profile-pics/tushara.png" },
                        { "title": "", "url": "img/profile-pics/dileepa.png" }];
                    this.animation = true;
                    this.keyboard = true;
                    this.backdrop = true;
                    this.users = [];
                    this.isWatchedFilter = false;
                    this.title = "RECENT TIMELINE";
                    this.timeLineWatch = {
                        tags: [],
                        isWatched: false,
                        isStatusUpdate: false
                    };
                    this.tags = '';
                    this.isLoading = false;
                    this.totalPages = 0;
                    this.recentTimeLineRequest = {
                        pageNo: 1,
                        pageSize: 10
                    };
                }
                RecentTimeLineComponent.prototype.ngOnInit = function () {
                    this.getRecentTimelines();
                };
                RecentTimeLineComponent.prototype.watchFilter = function (rtl) {
                    this.isWatchedFilter = !rtl;
                };
                RecentTimeLineComponent.prototype.onScroll = function () {
                    if (this.recentTimeLineRequest.pageNo > 1)
                        this.getRecentTimelines();
                };
                RecentTimeLineComponent.prototype.getRecentTimelines = function () {
                    var _this = this;
                    if (this.isLoading)
                        return;
                    this.isLoading = true;
                    this._timeLineService.getRecentTimeLines(this.recentTimeLineRequest)
                        .subscribe(function (timelines) {
                        _this.recentTimelinesTagSearch = timelines;
                        if (typeof _this.recentTimelines == 'undefined') {
                            _this.recentTimelines = new Array();
                        }
                        console.log(_this.recentTimelinesTagSearch);
                        for (var x = 0; x < _this.recentTimelinesTagSearch.length; x++) {
                            _this.totalPages = _this.recentTimelinesTagSearch[x].totalPages;
                            _this.recentTimelines.push(_this.recentTimelinesTagSearch[x]);
                        }
                        console.log(_this.recentTimelines);
                        if (_this.recentTimeLineRequest.pageNo < _this.totalPages) {
                            _this.recentTimeLineRequest.pageNo = _this.recentTimeLineRequest.pageNo + 1;
                            _this.isLoading = false;
                        }
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                        _this.isLoading = false;
                    }, function () { return function () {
                        console.log("Done");
                        _this.isLoading = false;
                    }; });
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
                    this._router.navigate(['timeline', { tags: this.tags }]);
                };
                RecentTimeLineComponent.prototype.openModal = function (timeline) {
                    this.selectedTimeline = timeline;
                    //this.parentModal.open()
                };
                RecentTimeLineComponent.prototype.watch = function (selectedTimeline) {
                    var timeLineWatch = {
                        tags: [],
                        isWatched: false,
                        isStatusUpdate: false,
                        timeLineId: selectedTimeline.id
                    };
                    timeLineWatch.isWatched = selectedTimeline.isWatched;
                    timeLineWatch.isStatusUpdate = true;
                    timeLineWatch.tags = selectedTimeline.tags.map(function (d) { return d['name']; });
                    this.updateTimelineWatch(timeLineWatch, selectedTimeline);
                };
                RecentTimeLineComponent.prototype.setCurrentTimeline = function (_selectedTimeline) {
                    this.currentTimeline_id = _selectedTimeline.id;
                    this.current_id = _selectedTimeline.timelineId;
                };
                RecentTimeLineComponent.prototype.onSelectedUsersChanged = function (_users) {
                    this.users = _users.map(function (d) { return d['userName']; });
                };
                RecentTimeLineComponent.prototype.shareTimeline = function () {
                    var timeline_share = {
                        TimeLineId: this.current_id,
                        AppUsers: this.users
                    };
                    var temp = this.currentTimeline_id;
                    var selected = this.recentTimelines.filter(function (obj) {
                        return obj.id == temp;
                    });
                    this._timeLineService.share(timeline_share).subscribe(function (res) { return selected[0].sharedWith = res; });
                };
                RecentTimeLineComponent = __decorate([
                    core_1.Component({
                        selector: 'recentimeline',
                        pipes: [recenttimeline_watchfilter_component_1.RecentTimelineWatchFilter],
                        templateUrl: './app/recenttimeline/recenttimeline.component.html',
                        //css
                        styles: ['.wrapper{width: 1%;margin: 2px auto;}'],
                        providers: [
                            recenttimeline_service_1.RecentTimeLineService, timeline_watch_service_1.TimeLineWatchService
                        ],
                        directives: [timeline_component_1.TimeLineComponent, modaldialog_1.MODAL_DIRECTIVES, sharetimeline_component_1.ShareTimelineComponent, users_selector_component_1.UsersSelectorComponent, carousel_component_1.CSSCarouselComponent, angular2_infinite_scroll_1.InfiniteScroll]
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