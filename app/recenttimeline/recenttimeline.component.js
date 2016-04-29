System.register(['angular2/core', '../services/recenttimeline.service', '../timeline/timeline.component', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, recenttimeline_service_1, timeline_component_1, router_1;
    var RecentTimeLineComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (recenttimeline_service_1_1) {
                recenttimeline_service_1 = recenttimeline_service_1_1;
            },
            function (timeline_component_1_1) {
                timeline_component_1 = timeline_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            RecentTimeLineComponent = (function () {
                function RecentTimeLineComponent(_timeLineService, _router) {
                    this._timeLineService = _timeLineService;
                    this._router = _router;
                    this.title = "RECENT TIMELINE";
                    this.tags = '';
                }
                RecentTimeLineComponent.prototype.ngOnInit = function () {
                    this.getRecentTimelines();
                };
                RecentTimeLineComponent.prototype.getRecentTimelines = function () {
                    var _this = this;
                    this._timeLineService.getRecentTimeLines()
                        .subscribe(function (timelines) {
                        _this.recenttimelines = timelines;
                        //this.filteredTimelines = JSON.parse(JSON.stringify(timelines));
                        console.log(_this.recenttimelines);
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
                RecentTimeLineComponent = __decorate([
                    core_1.Component({
                        selector: 'recentimeline',
                        templateUrl: './app/recenttimeline/recenttimeline.component.html',
                        providers: [
                            recenttimeline_service_1.RecentTimeLineService
                        ],
                        directives: [timeline_component_1.TimeLineComponent]
                    }), 
                    __metadata('design:paramtypes', [recenttimeline_service_1.RecentTimeLineService, router_1.Router])
                ], RecentTimeLineComponent);
                return RecentTimeLineComponent;
            }());
            exports_1("RecentTimeLineComponent", RecentTimeLineComponent);
        }
    }
});
//# sourceMappingURL=recenttimeline.component.js.map