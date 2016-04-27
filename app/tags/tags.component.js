System.register(['angular2/core', '../services/tags.service', 'ng2-bootstrap/ng2-bootstrap'], function(exports_1, context_1) {
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
    var core_1, tags_service_1, ng2_bootstrap_1;
    var TagsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tags_service_1_1) {
                tags_service_1 = tags_service_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            }],
        execute: function() {
            TagsComponent = (function () {
                function TagsComponent(tagsService) {
                    this.tagsService = tagsService;
                    this.tagRequest = {
                        name: ''
                    };
                    this.isCollapsed = false;
                    this.title = "Tags";
                    this.tags = [];
                    this.filteredTags = [];
                }
                TagsComponent.prototype.ngOnInit = function () {
                    this.getTags();
                };
                TagsComponent.prototype.filterTag = function (query, tags) {
                    var filtered = [];
                    for (var i = 0; i < tags.length; i++) {
                        var tag = tags[i];
                        if (tag.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            filtered.push(tag);
                        }
                    }
                    return filtered;
                };
                TagsComponent.prototype.searchTags = function (event) {
                    var query = event.query;
                    this.filteredTags = this.filterTag(query, this.tags);
                };
                TagsComponent.prototype.getTags = function () {
                    var _this = this;
                    this.tagsService.getTags().then(function (tags) {
                        _this.tags = tags;
                        _this.filteredTags = JSON.parse(JSON.stringify(tags));
                    });
                };
                TagsComponent.prototype.save = function () {
                    var _this = this;
                    this.tagsService.addTag(this.tagRequest)
                        .subscribe(function (data) {
                        console.log("added tag: " + data);
                        _this.filteredTags.push(data);
                    }, function (err) { return console.log("error: " + err); }, function () {
                        //this._router.navigate(['TimeLine']);
                    });
                };
                TagsComponent = __decorate([
                    core_1.Component({
                        selector: 'add-tag',
                        templateUrl: './app/tags/tags.component.html',
                        directives: [ng2_bootstrap_1.Collapse],
                        providers: [
                            tags_service_1.TagsService
                        ]
                    }), 
                    __metadata('design:paramtypes', [tags_service_1.TagsService])
                ], TagsComponent);
                return TagsComponent;
            }());
            exports_1("TagsComponent", TagsComponent);
        }
    }
});
//# sourceMappingURL=tags.component.js.map