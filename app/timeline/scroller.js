System.register(['rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Rx_1;
    var Scroller;
    return {
        setters:[
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            Scroller = (function () {
                function Scroller(windowElement, $interval, $elementRef, infiniteScrollCallback, infiniteScrollDistance, infiniteScrollParent, infiniteScrollThrottle, isImmediate) {
                    this.windowElement = windowElement;
                    this.$interval = $interval;
                    this.$elementRef = $elementRef;
                    this.infiniteScrollCallback = infiniteScrollCallback;
                    this.infiniteScrollThrottle = infiniteScrollThrottle;
                    this.isImmediate = isImmediate;
                    this.isContainerWindow = this.windowElement.hasOwnProperty('document');
                    this.documentElement = this.isContainerWindow ? this.windowElement.document.documentElement : null;
                    this.handleInfiniteScrollDistance(infiniteScrollDistance);
                    // if (attrs.infiniteScrollParent != null) {
                    // 	attachEvent(angular.element(elem.parent()));
                    // }
                    this.handleInfiniteScrollDisabled(false);
                    this.defineContainer();
                }
                Scroller.prototype.defineContainer = function () {
                    if (this.isContainerWindow) {
                        this.attachEvent(this.windowElement);
                    }
                    else {
                        this.container = this.windowElement.nativeElement;
                    }
                };
                Scroller.prototype.createInterval = function () {
                    var _this = this;
                    this.checkInterval = this.$interval(function () {
                        if (_this.isImmediate) {
                            return _this.handler();
                        }
                    }, 0);
                };
                Scroller.prototype.height = function (elem) {
                    // elem = elem.nativeElement;
                    if (isNaN(elem.offsetHeight)) {
                        return this.documentElement.clientHeight;
                    }
                    else {
                        return elem.offsetHeight;
                    }
                };
                Scroller.prototype.offsetTop = function (elem) {
                    // elem = elem.nativeElement;
                    if (!elem.getBoundingClientRect) {
                        return;
                    }
                    return elem.getBoundingClientRect().top + this.pageYOffset(elem);
                };
                Scroller.prototype.pageYOffset = function (elem) {
                    // elem = elem.nativeElement;
                    if (isNaN(window.pageYOffset)) {
                        return this.documentElement.scrollTop;
                    }
                    else if (elem.ownerDocument) {
                        return elem.ownerDocument.defaultView.pageYOffset;
                    }
                    else {
                        elem.offsetTop;
                    }
                };
                Scroller.prototype.handler = function () {
                    var container = this.calculatePoints();
                    var remaining = container.totalToScroll - container.scrolledUntilNow;
                    var containerBreakpoint = container.height * this.scrollDistance + 1;
                    var shouldScroll = remaining <= containerBreakpoint;
                    var triggerCallback = shouldScroll && this.scrollEnabled;
                    var shouldClearInterval = shouldScroll && this.checkInterval;
                    // if (this.useDocumentBottom) {
                    // 	container.totalToScroll = this.height(this.$elementRef.nativeElement.ownerDocument);
                    // }
                    this.checkWhenEnabled = shouldScroll;
                    if (triggerCallback) {
                        this.infiniteScrollCallback();
                    }
                    if (shouldClearInterval) {
                        clearInterval(this.checkInterval);
                    }
                };
                Scroller.prototype.calculatePoints = function () {
                    return this.isContainerWindow
                        ? this.calculatePointsForWindow()
                        : this.calculatePointsForElement();
                };
                Scroller.prototype.calculatePointsForWindow = function () {
                    // container's height
                    var height = this.height(this.container);
                    // scrolled until now / current y point
                    var scrolledUntilNow = height + this.pageYOffset(this.documentElement);
                    // total height / most bottom y point
                    var totalToScroll = this.offsetTop(this.$elementRef.nativeElement) + this.height(this.$elementRef.nativeElement);
                    return { height: height, scrolledUntilNow: scrolledUntilNow, totalToScroll: totalToScroll };
                };
                Scroller.prototype.calculatePointsForElement = function () {
                    var height = this.height(this.container);
                    // perhaps use this.container.offsetTop instead of 'scrollTop'
                    var scrolledUntilNow = this.container.scrollTop;
                    var containerTopOffset = 0;
                    var offsetTop = this.offsetTop(this.container);
                    if (offsetTop !== void 0) {
                        containerTopOffset = offsetTop;
                    }
                    var totalToScroll = this.container.scrollHeight;
                    // const totalToScroll = this.offsetTop(this.$elementRef.nativeElement) - containerTopOffset + this.height(this.$elementRef.nativeElement);
                    return { height: height, scrolledUntilNow: scrolledUntilNow, totalToScroll: totalToScroll };
                };
                Scroller.prototype.handleInfiniteScrollDistance = function (scrollDistance) {
                    return this.scrollDistance = parseFloat(scrollDistance) || 0;
                };
                Scroller.prototype.attachEvent = function (newContainer) {
                    var _this = this;
                    this.clean();
                    this.container = newContainer;
                    if (newContainer) {
                        var throttle_1 = this.infiniteScrollThrottle;
                        this.disposeScroll = Rx_1.Observable.fromEvent(this.container, 'scroll')
                            .debounce(function (ev) { return Rx_1.Observable.timer(throttle_1); })
                            .subscribe(function (ev) { return _this.handler(); });
                    }
                };
                Scroller.prototype.clean = function () {
                    if (this.disposeScroll) {
                        this.disposeScroll.unsubscribe();
                    }
                };
                Scroller.prototype.handleInfiniteScrollDisabled = function (enableScroll) {
                    this.scrollEnabled = !enableScroll;
                    // if (this.scrollEnabled && checkWhenEnabled) {
                    // 	checkWhenEnabled = false;
                    // 	return handler();
                    // }
                };
                return Scroller;
            }());
            exports_1("Scroller", Scroller);
        }
    }
});
//# sourceMappingURL=scroller.js.map