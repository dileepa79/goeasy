System.register(['@angular/core', 'primeng/primeng', '../services/tags.service'], function(exports_1, context_1) {
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
    var core_1, primeng_1, tags_service_1;
    var TagsSelectorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            },
            function (tags_service_1_1) {
                tags_service_1 = tags_service_1_1;
            }],
        execute: function() {
            TagsSelectorComponent = (function () {
                function TagsSelectorComponent(tagService) {
                    this.tagService = tagService;
                    this.tagsAdded = new core_1.EventEmitter();
                    this.tagsRemoved = new core_1.EventEmitter();
                    this.tags = [];
                }
                TagsSelectorComponent.prototype.filtertagMultiple = function (event) {
                    var _this = this;
                    var query = event.query;
                    this.tagService.getTags().then(function (tags) {
                        _this.filteredtagsMultiple = _this.filtertag(query, tags);
                        //let selected = { "name": query, "code": query }
                        //this.filteredtagsMultiple.splice(0, 0, selected);
                    });
                };
                TagsSelectorComponent.prototype.filtertag = function (query, tags) {
                    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
                    var filtered = [];
                    for (var i = 0; i < tags.length; i++) {
                        var tag = tags[i];
                        if (tag != undefined && tag.name != null) {
                            if (tag.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                                filtered.push(tag);
                            }
                        }
                    }
                    return filtered;
                };
                TagsSelectorComponent.prototype.handleSelectTag = function () {
                    this.tagsAdded.emit(this.tags);
                };
                TagsSelectorComponent.prototype.handleUnSelectTag = function () {
                    this.tagsRemoved.emit(this.tags);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TagsSelectorComponent.prototype, "tagsAdded", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TagsSelectorComponent.prototype, "tagsRemoved", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], TagsSelectorComponent.prototype, "isAllowedNewInput", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], TagsSelectorComponent.prototype, "inputValues", void 0);
                TagsSelectorComponent = __decorate([
                    core_1.Component({
                        selector: 'prime-app',
                        template: "\n        <p-autoComplete [(ngModel)]=\"tags\" [suggestions]=\"filteredtagsMultiple\" (completeMethod)=\"filtertagMultiple($event)\"\n            [minLength]=\"1\" placeholder=\"Select tags & press enter for new tags\" field=\"name\" [multiple]=\"true\" [allowNewInput] = \"isAllowedNewInput\" [inputValues] = \"inputValues\" (onSelect)=\"handleSelectTag($event)\" (onUnselect)=\"handleUnSelectTag($event)\">\n        </p-autoComplete>\n    ",
                        directives: [primeng_1.AutoComplete],
                        providers: [tags_service_1.TagsService]
                    }), 
                    __metadata('design:paramtypes', [tags_service_1.TagsService])
                ], TagsSelectorComponent);
                return TagsSelectorComponent;
            }());
            exports_1("TagsSelectorComponent", TagsSelectorComponent);
        }
    }
});
//# sourceMappingURL=tags-selector.component.js.map