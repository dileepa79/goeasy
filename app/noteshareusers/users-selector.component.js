System.register(['@angular/core', 'primeng/primeng', '../services/users.service'], function(exports_1, context_1) {
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
    var core_1, primeng_1, users_service_1;
    var UsersSelectorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            }],
        execute: function() {
            UsersSelectorComponent = (function () {
                function UsersSelectorComponent(userService) {
                    this.userService = userService;
                    this.usersAdded = new core_1.EventEmitter();
                    this.usersRemoved = new core_1.EventEmitter();
                    this.users = [];
                }
                UsersSelectorComponent.prototype.filteruserMultiple = function (event) {
                    var _this = this;
                    var query = event.query;
                    this.userService.getUsers().then(function (users) {
                        _this.filteredusersMultiple = _this.filteruser(query, users);
                    });
                };
                UsersSelectorComponent.prototype.filteruser = function (query, users) {
                    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
                    var filtered = [];
                    for (var i = 0; i < users.length; i++) {
                        var user = users[i];
                        if (user.userName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            filtered.push(user);
                        }
                    }
                    return filtered;
                };
                UsersSelectorComponent.prototype.handleSelectUser = function () {
                    this.usersAdded.emit(this.users);
                };
                UsersSelectorComponent.prototype.handleUnSelectUser = function () {
                    this.usersRemoved.emit(this.users);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], UsersSelectorComponent.prototype, "usersAdded", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], UsersSelectorComponent.prototype, "usersRemoved", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], UsersSelectorComponent.prototype, "isAllowedNewInput", void 0);
                UsersSelectorComponent = __decorate([
                    core_1.Component({
                        selector: 'user-app',
                        template: "\n        <p-autoComplete [(ngModel)]=\"users\" [suggestions]=\"filteredusersMultiple\" (completeMethod)=\"filteruserMultiple($event)\"\n            [minLength]=\"1\" placeholder=\"Select Users\" field=\"userName\" [multiple]=\"true\" [allowNewInput] = \"isAllowedNewInput\" (onSelect)=\"handleSelectUser($event)\" (onUnselect)=\"handleUnSelectUser($event)\">\n        </p-autoComplete>\n    ",
                        directives: [primeng_1.AutoComplete],
                        providers: [users_service_1.UsersService]
                    }), 
                    __metadata('design:paramtypes', [users_service_1.UsersService])
                ], UsersSelectorComponent);
                return UsersSelectorComponent;
            }());
            exports_1("UsersSelectorComponent", UsersSelectorComponent);
        }
    }
});
//# sourceMappingURL=users-selector.component.js.map