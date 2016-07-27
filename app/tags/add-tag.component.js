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
                    this.tag1 = {
                        id: 0,
                        name: ''
                    };
                    this.tagIdentityRequest = {
                        id: 0,
                        name: '',
                        description: '',
                        type: '',
                        subType: '',
                        address: '',
                        lat: '',
                        long: '',
                        location: '',
                        web: '',
                        bizCategory: '',
                        noOfEmployees: '',
                        annualRevenue: '',
                        title: '',
                        mobile: '',
                        workPhone: '',
                        email: '',
                        twitter: '',
                        linkedIn: '',
                        company: '',
                        im: '',
                        blog: '',
                        birthDate: '',
                        expNoOfYears: '',
                        currentCompany: '',
                        noticePeriod: '',
                        appliedPosition: '',
                        highestQualification: '',
                        expectedSalary: '',
                        planToMigrate: '',
                        expiryDate: '',
                        expiryStatus: '',
                        createdBy: '',
                        createdDate: '',
                        tag: { id: 0, name: '' }
                    };
                    this.heading = "TAG EDITOR";
                    this.active = true;
                    this.name = "";
                    this.title = "";
                    this.description = "";
                    this.type = "";
                    this.subType = "";
                    this.address = "";
                    this.lat = "";
                    this.long = "";
                    this.location = "";
                    this.web = "";
                    this.bizCategory = "";
                    this.noOfEmployees = "";
                    this.annualRevenue = "";
                    this.birthDate = "";
                    this.mobile = "";
                    this.workPhone = "";
                    this.email = "";
                    this.twitter = "";
                    this.linkedIn = "";
                    this.company = "";
                    this.im = "";
                    this.blog = "";
                    this.expNoOfYears = "";
                    this.currentCompany = "";
                    this.noticePeriod = "";
                    this.appliedPosition = "";
                    this.highestQualification = "";
                    this.expectedSalary = "";
                    this.planToMigrate = "";
                    this.expiryDate = "";
                    this.expiryStatus = "";
                    this.employeeRanges = [];
                    this.bizCategories = [];
                    this.tagIdentityTypes = [];
                    //employeeRanges = [{ label: 'less than 100', value: 0 }, { label: '100 - 500', value: 1 }, { label: '500 - 1000', value: 2 }, { label: '1000 - 5000', value: 3 }, { label: 'more than 5000', value: 4 }];
                    this.tagIdentityType = "Customer";
                    this.candidateChecked = false;
                }
                TagIdentityComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.routeSegment) {
                        var id = this.routeSegment.getParam('id');
                        console.log(' tag id ' + id);
                        this.tagIdentityTypes.push('General');
                        this.tagIdentityTypes.push('Customer');
                        this.tagIdentityTypes.push('Prospect');
                        this.tagIdentityTypes.push('Person');
                        this.tagIdentityTypes.push('Vacancy');
                        this.employeeRanges.push({ label: 'less than 100', value: 'less than 100' });
                        this.employeeRanges.push({ label: '100 - 500', value: '100 - 500' });
                        this.employeeRanges.push({ label: '500 - 1000', value: '500 - 1000' });
                        this.employeeRanges.push({ label: '1000 - 5000', value: '1000 - 5000' });
                        this.employeeRanges.push({ label: 'more than 5000', value: 'more than 5000' });
                        this.bizCategories.push({ label: 'Logistics', value: 'Logistics' });
                        this.bizCategories.push({ label: 'Technology', value: 'Technology' });
                        this.bizCategories.push({ label: 'Telecommunications', value: 'Telecommunications' });
                        if (id == '0') {
                            this.active = true;
                            return;
                        }
                        this._tagIdentityService.GetById(id).subscribe(function (t) {
                            if (t) {
                                //console.log(JSON.stringify(t));
                                //this.tagIdentityRequest.id = t.id;
                                _this.type = t.type;
                                _this.subType = t.subType;
                                _this.tagIdentityType = t.type;
                                _this.description = t.description;
                                _this.address = t.address;
                                _this.lat = t.lat;
                                _this.long = t.long;
                                _this.location = t.location;
                                _this.web = t.web;
                                _this.bizCategory = t.bizCategory;
                                _this.noOfEmployees = t.noOfEmployees;
                                _this.annualRevenue = t.annualRevenue;
                                _this.name = t.name;
                                _this.tag = t.tag;
                                _this.tagIdentityRequest.id = _this.tag.id;
                                _this.tagIdentityRequest.name = _this.tag.name;
                                _this.title = t.title;
                                _this.birthDate = t.birthDate;
                                _this.name = t.tag.name;
                                _this.mobile = t.mobile;
                                _this.workPhone = t.workPhone;
                                _this.email = t.email;
                                _this.twitter = t.twitter;
                                _this.linkedIn = t.linkedIn;
                                _this.company = t.company;
                                _this.im = t.im;
                                _this.blog = t.blog;
                                _this.expNoOfYears = t.expNoOfYears;
                                _this.currentCompany = t.currentCompany;
                                _this.noticePeriod = t.noticePeriod;
                                _this.appliedPosition = t.appliedPosition;
                                _this.highestQualification = t.highestQualification;
                                _this.expectedSalary = t.expectedSalary;
                                _this.planToMigrate = t.planToMigrate;
                                _this.expiryDate = t.expiryDate;
                                _this.expiryStatus = t.expiryStatus;
                                if (_this.tagIdentityType == 'Person' && _this.subType == 'Candidate') {
                                    _this.candidateChecked = true;
                                    console.log('this.candidateChecked=' + _this.candidateChecked);
                                }
                                else
                                    _this.candidateChecked = false;
                                console.log(JSON.stringify(t));
                            }
                        }, function (error) {
                        }, function () { return function () { return console.log("Done"); }; });
                        this._tagsService.getById(id)
                            .subscribe(function (g) {
                            //console.log(JSON.stringify(g));
                            _this.tag = g;
                            _this.tagIdentityRequest.id = _this.tag.id;
                            _this.tagIdentityRequest.name = _this.tag.name;
                            _this.name = _this.tag.name;
                        }, function (error) {
                            console.log(_this.tag);
                        }, function () { return function () { return console.log("Done"); }; });
                    }
                    this.active = true;
                };
                TagIdentityComponent.prototype.save = function () {
                    var _this = this;
                    if (this.tag) {
                        this.tagIdentityRequest.id = this.tag.id;
                        this.tagIdentityRequest.name = this.tag.name;
                    }
                    else {
                        this.tagIdentityRequest.name = this.name;
                    }
                    if (this.tagIdentityType == 'Person' && this.candidateChecked == true)
                        this.subType = 'Candidate';
                    else
                        this.subType = '';
                    console.log('this.candidateChecked : ' + this.candidateChecked);
                    this.tagIdentityRequest.description = this.description;
                    this.tagIdentityRequest.type = this.tagIdentityType;
                    this.tagIdentityRequest.subType = this.subType;
                    this.tagIdentityRequest.address = this.address;
                    this.tagIdentityRequest.lat = this.lat;
                    this.tagIdentityRequest.long = this.long;
                    this.tagIdentityRequest.location = this.location;
                    this.tagIdentityRequest.web = this.web;
                    this.tagIdentityRequest.bizCategory = this.bizCategory;
                    this.tagIdentityRequest.noOfEmployees = this.noOfEmployees;
                    this.tagIdentityRequest.annualRevenue = this.annualRevenue;
                    this.tagIdentityRequest.title = this.title;
                    this.tagIdentityRequest.birthDate = this.birthDate;
                    this.tagIdentityRequest.mobile = this.mobile;
                    this.tagIdentityRequest.workPhone = this.workPhone;
                    this.tagIdentityRequest.email = this.email;
                    this.tagIdentityRequest.twitter = this.twitter;
                    this.tagIdentityRequest.linkedIn = this.linkedIn;
                    this.tagIdentityRequest.company = this.company;
                    this.tagIdentityRequest.im = this.im;
                    this.tagIdentityRequest.blog = this.blog;
                    this.tagIdentityRequest.expNoOfYears = this.expNoOfYears;
                    this.tagIdentityRequest.currentCompany = this.currentCompany;
                    this.tagIdentityRequest.noticePeriod = this.noticePeriod;
                    this.tagIdentityRequest.appliedPosition = this.appliedPosition;
                    this.tagIdentityRequest.highestQualification = this.highestQualification;
                    this.tagIdentityRequest.expectedSalary = this.expectedSalary;
                    this.tagIdentityRequest.planToMigrate = this.planToMigrate;
                    this.tagIdentityRequest.expiryDate = this.expiryDate;
                    this.tagIdentityRequest.expiryStatus = this.expiryStatus;
                    this._tagIdentityService.addTag(this.tagIdentityRequest)
                        .subscribe(function (tag) {
                        console.log('Tag Saved');
                        _this._router.navigate(['/tags']);
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