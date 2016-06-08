System.register(['@angular/core', '../services/timeline.service', '../tags/tags-selector.component', './timelinegroup/timelinegroup.component', './timelinegroup/timelinedetail.component', '@angular/router', 'rxjs/Observable', '../services/passtag.service', '../timeline/angular2-infinite-scroll'], function(exports_1, context_1) {
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
    var core_1, timeline_service_1, tags_selector_component_1, timelinegroup_component_1, timelinedetail_component_1, router_1, Observable_1, passtag_service_1, angular2_infinite_scroll_1;
    var TimeLineComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (timeline_service_1_1) {
                timeline_service_1 = timeline_service_1_1;
            },
            function (tags_selector_component_1_1) {
                tags_selector_component_1 = tags_selector_component_1_1;
            },
            function (timelinegroup_component_1_1) {
                timelinegroup_component_1 = timelinegroup_component_1_1;
            },
            function (timelinedetail_component_1_1) {
                timelinedetail_component_1 = timelinedetail_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (passtag_service_1_1) {
                passtag_service_1 = passtag_service_1_1;
            },
            function (angular2_infinite_scroll_1_1) {
                angular2_infinite_scroll_1 = angular2_infinite_scroll_1_1;
            }],
        execute: function() {
            TimeLineComponent = (function () {
                function TimeLineComponent(_timeLineService, routeSegment, passTagService) {
                    this._timeLineService = _timeLineService;
                    this.passTagService = passTagService;
                    this.oneAtATime = true;
                    this.tagsStr = '';
                    this.isLoading = false;
                    this.title = "TIMELINE";
                    this.passedTags = [];
                    this.selectedTagStr = '';
                    this.timeLineRequest = {
                        data: [],
                        isPersistedSearch: false,
                        pageNo: 1,
                        pageSize: 10
                    };
                    this.tagsStr = routeSegment.getParam('tags');
                }
                TimeLineComponent.prototype.ngOnInit = function () {
                    if (this.tagsStr != null) {
                        var tagsArr = this.tagsStr.split(",");
                        for (var i = 0; i < tagsArr.length; i++) {
                            var tag = tagsArr[i];
                            this.passedTags.push(tag);
                        }
                        this.timeLineRequest.data = this.passedTags;
                    }
                    this.getTimelines();
                };
                TimeLineComponent.prototype.onScroll = function () {
                    // console.log('scrolled!!')
                    this.getTimelines();
                };
                TimeLineComponent.prototype.routerCanDeactivate = function (currTree, futureTree) {
                    this.timeLineRequest.isPersistedSearch = true;
                    this.getTimelines();
                    return Observable_1.Observable.of(true).delay(200).toPromise();
                };
                TimeLineComponent.prototype.onSelectedTagsAdded = function (tags) {
                    var _this = this;
                    this.selectedTags = tags;
                    if (this.selectedTags.length != 0) {
                        var selected = this.selectedTags;
                        this.filteredTimelines.forEach(function (tl) {
                            var itemIndexesToDelete = [];
                            tl.items.forEach(function (item) {
                                var selectedArr = selected.map(function (d) { return d['name']; });
                                var itemsArr = item.tags.map(function (d) { return d['name']; });
                                var isExists = selectedArr.every(function (i) { return itemsArr.indexOf(i) !== -1; });
                                if (!isExists) {
                                    var index = tl.items.indexOf(item);
                                    if (index > -1) {
                                        itemIndexesToDelete.push(index);
                                    }
                                }
                            });
                            for (var i = itemIndexesToDelete.length - 1; i >= 0; i--)
                                tl.items.splice(itemIndexesToDelete[i], 1);
                            console.log(_this.filteredTimelines);
                        });
                    }
                    else {
                        this.filteredTimelines = JSON.parse(JSON.stringify(this.timelines));
                    }
                };
                TimeLineComponent.prototype.onSelectedTagsRemoved = function (tags) {
                    var _this = this;
                    this.selectedTags = tags;
                    if (this.selectedTags.length != 0) {
                        this.filteredTimelines = JSON.parse(JSON.stringify(this.timelines));
                        var selected = this.selectedTags;
                        this.filteredTimelines.forEach(function (tl) {
                            var itemIndexesToDelete = [];
                            tl.items.forEach(function (item) {
                                var selectedArr = selected.map(function (d) { return d['name']; });
                                var itemsArr = item.tags.map(function (d) { return d['name']; });
                                var isExists = selectedArr.every(function (i) { return itemsArr.indexOf(i) !== -1; });
                                if (!isExists) {
                                    var index = tl.items.indexOf(item);
                                    if (index > -1) {
                                        itemIndexesToDelete.push(index);
                                    }
                                }
                            });
                            for (var i = itemIndexesToDelete.length - 1; i >= 0; i--)
                                tl.items.splice(itemIndexesToDelete[i], 1);
                            console.log(_this.filteredTimelines);
                        });
                    }
                    else {
                        this.filteredTimelines = JSON.parse(JSON.stringify(this.timelines));
                    }
                };
                TimeLineComponent.prototype.onSelectedTagsChanged = function (tags) {
                    this.timeLineRequest.data = tags.map(function (d) { return d['name']; });
                    this.timeLineRequest.isPersistedSearch = false;
                    this.timeLineRequest.pageNo = 1;
                    if (typeof this.filteredTimelines != 'undefined') {
                        this.filteredTimelines = new Array();
                    }
                    this.selectedTagStr = '';
                    for (var i = 0; i < this.timeLineRequest.data.length; i++) {
                        this.selectedTagStr = this.selectedTagStr + (this.timeLineRequest.data[i] + (this.timeLineRequest.data.length != i + 1 ? ',' : ''));
                    }
                    this.passTagService.setTags(this.selectedTagStr);
                    window.angularComponentRef.zone.run(function () { window.angularComponentRef.component.updateSelectedTags(); });
                    this.getTimelines();
                };
                TimeLineComponent.prototype.getTimelines = function () {
                    var _this = this;
                    this._timeLineService.getTimeLines(this.timeLineRequest)
                        .subscribe(function (timelines) {
                        if (timelines.length <= 0) {
                            return;
                        }
                        if (_this.isLoading)
                            return;
                        _this.isLoading = true;
                        _this.timelines = timelines;
                        if (typeof _this.filteredTimelines == 'undefined') {
                            _this.filteredTimelines = new Array();
                        }
                        for (var x = 0; x < timelines.length; x++) {
                            timelines[x].isLabled = true;
                            _this.filteredTimelines.push(timelines[x]);
                        }
                        for (var y = 0; y < _this.filteredTimelines.length; y++) {
                            if (y == _this.filteredTimelines.length - 1) {
                                break;
                            }
                            if (_this.filteredTimelines[y].dateFormat == _this.filteredTimelines[y + 1].dateFormat) {
                                _this.filteredTimelines[y + 1].isLabled = false;
                            }
                        }
                        if (_this.timelines.length > 0) {
                            _this.timeLineRequest.pageNo = _this.timeLineRequest.pageNo + 1;
                            _this.isLoading = false;
                        }
                        else {
                            _this.isLoading = true;
                        }
                        console.log(_this.timelines);
                        console.log(_this.filteredTimelines);
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                        _this.isLoading = false;
                    }, function () { return function () { return console.log("Done"); }; });
                };
                TimeLineComponent = __decorate([
                    core_1.Component({
                        selector: 'timeline',
                        templateUrl: './app/timeline/timeline.component.html',
                        providers: [
                            timeline_service_1.TimeLineService
                        ],
                        directives: [tags_selector_component_1.TagsSelectorComponent, timelinegroup_component_1.TimelineInfo, timelinegroup_component_1.TimelineGroup, timelinedetail_component_1.TimelineDetail, timelinedetail_component_1.TimelineDetailGroup, angular2_infinite_scroll_1.InfiniteScroll]
                    }), 
                    __metadata('design:paramtypes', [timeline_service_1.TimeLineService, router_1.RouteSegment, passtag_service_1.PassTagService])
                ], TimeLineComponent);
                return TimeLineComponent;
            }());
            exports_1("TimeLineComponent", TimeLineComponent);
        }
    }
});
//# sourceMappingURL=timeline.component.js.map