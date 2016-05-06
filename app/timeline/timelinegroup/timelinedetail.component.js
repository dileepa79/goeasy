System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var TimelineDetail, TimelineDetailGroup;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TimelineDetail = (function () {
                function TimelineDetail() {
                    this.groups = [];
                }
                TimelineDetail.prototype.addGroup = function (group) { this.groups.push(group); };
                TimelineDetail.prototype.closeOthers = function (openGroup) {
                    if (!this.onlyOneOpen) {
                        return;
                    }
                    this.groups.forEach(function (group) {
                        if (group !== openGroup) {
                            group.isOpen = false;
                        }
                    });
                };
                TimelineDetail.prototype.removeGroup = function (group) {
                    var index = this.groups.indexOf(group);
                    if (index !== -1) {
                        this.groups.splice(index, 1);
                    }
                };
                __decorate([
                    core_1.Input('closeOthers'), 
                    __metadata('design:type', Boolean)
                ], TimelineDetail.prototype, "onlyOneOpen", void 0);
                TimelineDetail = __decorate([
                    core_1.Component({
                        selector: 'timelinedetail',
                        template: "<ng-content></ng-content>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TimelineDetail);
                return TimelineDetail;
            }());
            exports_1("TimelineDetail", TimelineDetail);
            TimelineDetailGroup = (function () {
                function TimelineDetailGroup(timelineDetail) {
                    this.timelineDetail = timelineDetail;
                    this._isOpen = false;
                    this.timelineDetail.addGroup(this);
                }
                TimelineDetailGroup.prototype.toggleOpen = function (event) {
                    event.preventDefault();
                    if (!this.isDisabled) {
                        this.isOpen = !this.isOpen;
                    }
                };
                TimelineDetailGroup.prototype.ngOnDestroy = function () { this.timelineDetail.removeGroup(this); };
                Object.defineProperty(TimelineDetailGroup.prototype, "isOpen", {
                    get: function () { return this._isOpen; },
                    set: function (value) {
                        this._isOpen = value;
                        if (value) {
                            this.timelineDetail.closeOthers(this);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                TimelineDetailGroup = __decorate([
                    core_1.Component({
                        selector: 'timeline-detail-group',
                        inputs: ['heading', 'isOpen', 'isDisabled'],
                        templateUrl: './app/timeline/timelinegroup/timelinedetail.component.html'
                    }), 
                    __metadata('design:paramtypes', [TimelineDetail])
                ], TimelineDetailGroup);
                return TimelineDetailGroup;
            }());
            exports_1("TimelineDetailGroup", TimelineDetailGroup);
        }
    }
});
//# sourceMappingURL=timelinedetail.component.js.map