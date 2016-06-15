System.register(['@angular/core'], function(exports_1, context_1) {
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
    var LoadingComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            LoadingComponent = (function () {
                function LoadingComponent(zone) {
                    this.zone = zone;
                    this.showLoading = false;
                    window.loadingComponentRef = {
                        zone: this.zone,
                        component: this
                    };
                }
                LoadingComponent.prototype.show = function () { this.showLoading = true; };
                LoadingComponent.prototype.hide = function () { this.showLoading = false; };
                LoadingComponent = __decorate([
                    core_1.Component({
                        selector: 'loading',
                        templateUrl: 'app/loader/loading.component.html'
                    }), 
                    __metadata('design:paramtypes', [core_1.NgZone])
                ], LoadingComponent);
                return LoadingComponent;
            }());
            exports_1("LoadingComponent", LoadingComponent);
        }
    }
});
//# sourceMappingURL=loading.component.js.map