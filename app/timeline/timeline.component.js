System.register(['angular2/core', '../services/timeline.service', '../tags/tags-selector.component', '../directive/accordion/accordion.component', '../directive/accordion/accordionlevel.component', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, timeline_service_1, tags_selector_component_1, accordion_component_1, accordionlevel_component_1, router_1;
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
            function (accordion_component_1_1) {
                accordion_component_1 = accordion_component_1_1;
            },
            function (accordionlevel_component_1_1) {
                accordionlevel_component_1 = accordionlevel_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            TimeLineComponent = (function () {
                function TimeLineComponent(_timeLineService, params) {
                    this._timeLineService = _timeLineService;
                    this.oneAtATime = true;
                    this.title = "TIMELINE";
                    this.timeLineRequest = {
                        data: [],
                        isPersistedSearch: false
                    };
                    this.tagsStr = params.get('tags');
                }
                TimeLineComponent.prototype.ngOnInit = function () {
                    if (this.tagsStr != null) {
                        var tagsArr = this.tagsStr.split(",");
                        this.tagsResponce.data = tagsArr.map(function (d) { return d['name']; });
                        this.timeLineRequest.data = this.tagsResponce.data;
                    }
                    this.getTimelines();
                };
                TimeLineComponent.prototype.ngOnDestroy = function () {
                    this.timeLineRequest.isPersistedSearch = true;
                    this.getTimelines();
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
                    this.getTimelines();
                };
                TimeLineComponent.prototype.getTimelines = function () {
                    var _this = this;
                    this._timeLineService.getTimeLines(this.timeLineRequest)
                        .subscribe(function (timelines) {
                        _this.timelines = timelines;
                        _this.filteredTimelines = JSON.parse(JSON.stringify(timelines));
                        console.log(_this.timelines);
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                    }, function () { return function () { return console.log("Done"); }; });
                };
                TimeLineComponent = __decorate([
                    core_1.Component({
                        selector: 'timeline',
                        templateUrl: './app/timeline/timeline.component.html',
                        providers: [
                            timeline_service_1.TimeLineService
                        ],
                        directives: [tags_selector_component_1.TagsSelectorComponent, accordion_component_1.Accordion, accordion_component_1.AccordionGroup, accordionlevel_component_1.AccordionLevel, accordionlevel_component_1.AccordionGroupLevel]
                    }), 
                    __metadata('design:paramtypes', [timeline_service_1.TimeLineService, router_1.RouteParams])
                ], TimeLineComponent);
                return TimeLineComponent;
            }());
            exports_1("TimeLineComponent", TimeLineComponent);
        }
    }
});
//# sourceMappingURL=timeline.component.js.map