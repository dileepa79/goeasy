System.register(['@angular/core', '@angular/router', '../services/tags.service', './tags-filter.pipe', '../directives/collapse.directive', 'primeng/primeng'], function(exports_1, context_1) {
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
    var core_1, router_1, tags_service_1, tags_filter_pipe_1, collapse_directive_1, primeng_1;
    var TagsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (tags_service_1_1) {
                tags_service_1 = tags_service_1_1;
            },
            function (tags_filter_pipe_1_1) {
                tags_filter_pipe_1 = tags_filter_pipe_1_1;
            },
            function (collapse_directive_1_1) {
                collapse_directive_1 = collapse_directive_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            }],
        execute: function() {
            TagsComponent = (function () {
                function TagsComponent(_router, tagsService) {
                    this._router = _router;
                    this.tagsService = tagsService;
                    this.tagRequest = {
                        id: 0,
                        name: '',
                        createdBy: '',
                        createdDate: ''
                    };
                    this.isCollapsed = false;
                    this.title = "Tags";
                    this.tags = [];
                    this.filteredTags = [];
                }
                TagsComponent.prototype.ngOnInit = function () {
                    this.getTags();
                };
                TagsComponent.prototype.onClick = function (tag) {
                    this._router.navigate(['/newtag', tag.id]);
                    //this._router.navigate(['/tag', tag.id]);
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
                        //this._router.navigate(['timeline']);
                    });
                };
                TagsComponent.prototype.onTagCreate = function () {
                    console.log('onTagCreate');
                    this._router.navigate(['/newtag', '']);
                };
                TagsComponent = __decorate([
                    core_1.Component({
                        selector: 'add-tag',
                        templateUrl: './app/tags/tags.component.html',
                        pipes: [tags_filter_pipe_1.TagFilterPipe],
                        directives: [collapse_directive_1.CollapseDirective, primeng_1.Button],
                        providers: [
                            tags_service_1.TagsService
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, tags_service_1.TagsService])
                ], TagsComponent);
                return TagsComponent;
            }());
            exports_1("TagsComponent", TagsComponent);
        }
    }
});
//# sourceMappingURL=tags.component.js.map