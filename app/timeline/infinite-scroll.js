System.register(['@angular/core', '../timeline/scroller'], function(exports_1, context_1) {
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
    var core_1, scroller_1;
    var InfiniteScroll;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (scroller_1_1) {
                scroller_1 = scroller_1_1;
            }],
        execute: function() {
            InfiniteScroll = (function () {
                function InfiniteScroll(element) {
                    this.element = element;
                    this._distance = 2;
                    this._throttle = 3;
                    this.scrollWindow = true;
                    this._immediate = false;
                    this.scrolled = new core_1.EventEmitter();
                }
                InfiniteScroll.prototype.ngOnInit = function () {
                    var containerElement = this.scrollWindow ? window : this.element;
                    this.scroller = new scroller_1.Scroller(containerElement, setInterval, this.element, this.onScroll.bind(this), this._distance, {}, this._throttle, this._immediate);
                };
                InfiniteScroll.prototype.ngOnDestroy = function () {
                    if (typeof this.scroller != 'undefined') {
                        this.scroller.clean();
                    }
                };
                InfiniteScroll.prototype.onScroll = function () {
                    this.scrolled.next({});
                };
                InfiniteScroll.prototype.handleScroll = function (event) {
                    this.scroller.handler();
                };
                __decorate([
                    core_1.Input('infiniteScrollDistance'), 
                    __metadata('design:type', Number)
                ], InfiniteScroll.prototype, "_distance", void 0);
                __decorate([
                    core_1.Input('infiniteScrollThrottle'), 
                    __metadata('design:type', Number)
                ], InfiniteScroll.prototype, "_throttle", void 0);
                __decorate([
                    core_1.Input('scrollWindow'), 
                    __metadata('design:type', Boolean)
                ], InfiniteScroll.prototype, "scrollWindow", void 0);
                __decorate([
                    core_1.Input('immediateCheck'), 
                    __metadata('design:type', Boolean)
                ], InfiniteScroll.prototype, "_immediate", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], InfiniteScroll.prototype, "scrolled", void 0);
                __decorate([
                    core_1.HostListener('scroll', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], InfiniteScroll.prototype, "handleScroll", null);
                InfiniteScroll = __decorate([
                    core_1.Directive({
                        selector: '[infinite-scroll]'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], InfiniteScroll);
                return InfiniteScroll;
            }());
            exports_1("InfiniteScroll", InfiniteScroll);
        }
    }
});
//# sourceMappingURL=infinite-scroll.js.map