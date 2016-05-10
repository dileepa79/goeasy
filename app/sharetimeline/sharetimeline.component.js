"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var tags_service_1 = require('../services/tags.service');
var users_selector_component_1 = require('../noteshareusers/users-selector.component');
var ShareTimelineComponent = (function () {
    function ShareTimelineComponent(tagService) {
        this.tagService = tagService;
        this.users = [];
    }
    ShareTimelineComponent.prototype.filterUserMultiple = function (event) {
        var _this = this;
        var query = event.query;
        this.tagService.getTags().then(function (users) {
            _this.filteredUsersMultiple = _this.filtertag(query, users);
        });
    };
    ShareTimelineComponent.prototype.filtertag = function (query, users) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        var filtered = [];
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (user.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(user);
            }
        }
        return filtered;
    };
    ShareTimelineComponent.prototype.onSelectedUsersChanged = function (users) {
        this.users = users.map(function (d) { return d['userName']; });
    };
    ShareTimelineComponent = __decorate([
        core_1.Component({
            selector: 'sharetimeline',
            directives: [users_selector_component_1.UsersSelectorComponent],
            templateUrl: './app/sharetimeline/sharetimeline.component.html',
            providers: [tags_service_1.TagsService]
        })
    ], ShareTimelineComponent);
    return ShareTimelineComponent;
}());
exports.ShareTimelineComponent = ShareTimelineComponent;
//# sourceMappingURL=sharetimeline.component.js.map