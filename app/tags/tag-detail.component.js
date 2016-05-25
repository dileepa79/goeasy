System.register(['@angular/core', '../services/tags.service', '@angular/router'], function(exports_1, context_1) {
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
    var core_1, tags_service_1, router_1;
    var TagDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tags_service_1_1) {
                tags_service_1 = tags_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            TagDetailComponent = (function () {
                function TagDetailComponent(_router, routeSegment, _tagsService) {
                    this._router = _router;
                    this.routeSegment = routeSegment;
                    this._tagsService = _tagsService;
                    this.pageTitle = 'Tag Detail';
                }
                TagDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = this.routeSegment.getParam('id');
                    this._tagsService.getAllTags()
                        .subscribe(function (t) {
                        _this.tag = t.data.filter(function (t) { return t.id === +id; })[0];
                        console.log(_this.errorMessage);
                    }, function (error) {
                        console.log(_this.tag);
                    }, function () { return function () { return console.log("Done"); }; });
                };
                TagDetailComponent = __decorate([
                    core_1.Component({
                        templateUrl: './app/tags/tag-detail.component.html',
                        providers: [
                            tags_service_1.TagsService
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteSegment, tags_service_1.TagsService])
                ], TagDetailComponent);
                return TagDetailComponent;
            }());
            exports_1("TagDetailComponent", TagDetailComponent);
        }
    }
});
//# sourceMappingURL=tag-detail.component.js.map