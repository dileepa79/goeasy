System.register(['@angular/core', '@angular/router', '../services/tags.service', '../services/tag.identity.service'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, tags_service_1, tag_identity_service_1;
    var TagIdentityComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (tags_service_1_1) {
                tags_service_1 = tags_service_1_1;
            },
            function (tag_identity_service_1_1) {
                tag_identity_service_1 = tag_identity_service_1_1;
            }],
        execute: function() {
            TagIdentityComponent = (function () {
                function TagIdentityComponent(_router, routeSegment, _tagIdentityService, _tagsService) {
                    this._router = _router;
                    this.routeSegment = routeSegment;
                    this._tagIdentityService = _tagIdentityService;
                    this._tagsService = _tagsService;
                    this.tagIdentityRequest = {
                        id: 0,
                        name: '',
                        description: '',
                        lat: '',
                        long: '',
                        location: '',
                        web: '',
                        bizCategory: '',
                        noOfEmployees: '',
                        annualRevenue: '',
                        createdBy: '',
                        createdDate: ''
                    };
                    this.heading = "TAG EDITOR";
                    this.active = true;
                    this.name = "";
                    this.title = "";
                    this.description = "";
                    this.lat = "";
                    this.long = "";
                    this.location = "";
                    this.web = "";
                    this.bizCategory = "";
                    this.noOfEmployees = "";
                    this.annualRevenue = "";
                }
                TagIdentityComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.routeSegment) {
                        console.log(' tag id ' + id_1);
                        var id_1 = this.routeSegment.getParam('id');
                        this._tagIdentityService.GetById(id_1).subscribe(function (t) {
                            console.log(JSON.stringify(t));
                            //this.tagIdentityRequest.id = t.id;
                            _this.description = t.description;
                            _this.lat = t.lat;
                            _this.long = t.long;
                            _this.location = t.location;
                            _this.web = t.web;
                            _this.bizCategory = t.bizCategory;
                            _this.noOfEmployees = t.noOfEmployees;
                            _this.annualRevenue = t.annualRevenue;
                            _this.name = t.name;
                        }, function (error) {
                        }, function () { return function () { return console.log("Done"); }; });
                        this._tagsService.getAllTags()
                            .subscribe(function (t) {
                            _this.tag = t.data.filter(function (t) { return t.id === +id_1; })[0];
                            _this.tagIdentityRequest.id = _this.tag.id;
                            _this.tagIdentityRequest.name = _this.tag.name;
                            _this.name = _this.tag.name;
                            console.log(_this.errorMessage);
                        }, function (error) {
                            console.log(_this.tag);
                        }, function () { return function () { return console.log("Done"); }; });
                    }
                    this.active = true;
                };
                TagIdentityComponent.prototype.save = function () {
                    this.tagIdentityRequest.id = this.tag.id;
                    this.tagIdentityRequest.name = this.tag.name;
                    this.tagIdentityRequest.description = this.description;
                    this.tagIdentityRequest.lat = this.lat;
                    this.tagIdentityRequest.long = this.long;
                    this.tagIdentityRequest.location = this.location;
                    this.tagIdentityRequest.web = this.web;
                    this.tagIdentityRequest.bizCategory = this.bizCategory;
                    this.tagIdentityRequest.noOfEmployees = this.noOfEmployees;
                    this.tagIdentityRequest.annualRevenue = this.annualRevenue;
                    this._tagIdentityService.addTag(this.tagIdentityRequest)
                        .subscribe(function (tag) {
                        console.log('Tag Saved');
                    }, function (error) {
                        console.log('error when saving');
                    }, function () { return function () {
                        console.log("Done");
                    }; });
                };
                TagIdentityComponent = __decorate([
                    core_1.Component({
                        selector: 'new-tag',
                        templateUrl: './app/tags/add-tag.component.html',
                        providers: [
                            tags_service_1.TagsService,
                            tag_identity_service_1.TagIdentityService
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_2.Router, router_1.RouteSegment, tag_identity_service_1.TagIdentityService, tags_service_1.TagsService])
                ], TagIdentityComponent);
                return TagIdentityComponent;
            }());
            exports_1("TagIdentityComponent", TagIdentityComponent);
        }
    }
});
//# sourceMappingURL=add-tag.component.js.map