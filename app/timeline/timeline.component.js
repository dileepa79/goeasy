System.register(['angular2/core', '../services/timeline.service', '../tags/tags-selector.component'], function(exports_1, context_1) {
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
    var core_1, timeline_service_1, tags_selector_component_1;
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
            }],
        execute: function() {
            TimeLineComponent = (function () {
                function TimeLineComponent(_timeLineService) {
                    this._timeLineService = _timeLineService;
                    this.title = "TIMELINE";
                }
                TimeLineComponent.prototype.ngOnInit = function () {
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
                //getTimelines() {
                //    this._timeLineService.getTimeLines()
                //        .subscribe(tl => {
                //                //this.timelines = timelines;
                //                tl.forEach((tt) => {
                //                    this.timelines.push(
                //                        //new TimeLineResponse(
                //                        //    tt.Title,
                //                        //    tt.Description,
                //                        //    new Date(tt.CreateDate)
                //                        //));
                //                        new TimeLineResponse(
                //                            tt.Title,
                //                            tt.Description
                //                        ));
                //                });
                //                console.log(this.timelines);
                //            },
                //            error => {
                //                this.errorMessage = <any>error,
                //                    console.log(this.errorMessage);
                //            },
                //            () => () => console.log("Done"));
                //}
                TimeLineComponent.prototype.getTimelines = function () {
                    var _this = this;
                    this._timeLineService.getTimeLines()
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
                        directives: [tags_selector_component_1.TagsSelectorComponent]
                    }), 
                    __metadata('design:paramtypes', [timeline_service_1.TimeLineService])
                ], TimeLineComponent);
                return TimeLineComponent;
            }());
            exports_1("TimeLineComponent", TimeLineComponent);
        }
    }
});
//# sourceMappingURL=timeline.component.js.map