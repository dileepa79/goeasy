System.register(['angular2/core', '../services/users.service', 'ng2-bootstrap/ng2-bootstrap'], function(exports_1, context_1) {
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
    var core_1, users_service_1, ng2_bootstrap_1;
    var UsersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            }],
        execute: function() {
            UsersComponent = (function () {
                function UsersComponent(usersService) {
                    this.usersService = usersService;
                    this.userRequest = {
                        userName: '',
                        userId: ''
                    };
                    this.isCollapsed = false;
                    this.title = "Users";
                    this.users = [];
                    this.filteredUsers = [];
                }
                UsersComponent.prototype.ngOnInit = function () {
                    this.getUsers();
                };
                UsersComponent.prototype.filterUser = function (query, users) {
                    var filtered = [];
                    for (var i = 0; i < users.length; i++) {
                        var user = users[i];
                        if (user.userName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            filtered.push(user);
                        }
                    }
                    return filtered;
                };
                UsersComponent.prototype.searchUsers = function (event) {
                    var query = event.query;
                    this.filteredUsers = this.filterUser(query, this.users);
                };
                UsersComponent.prototype.getUsers = function () {
                    var _this = this;
                    this.usersService.getUsers().then(function (users) {
                        _this.users = users;
                        _this.filteredUsers = JSON.parse(JSON.stringify(users));
                    });
                };
                UsersComponent.prototype.onSelectedUsersChanged = function (users) {
                    //this.users = users.map(function (d) { return d['userName']; });
                };
                UsersComponent = __decorate([
                    core_1.Component({
                        selector: 'add-user',
                        templateUrl: './app/users/users.component.html',
                        directives: [ng2_bootstrap_1.Collapse],
                        providers: [
                            users_service_1.UsersService
                        ]
                    }), 
                    __metadata('design:paramtypes', [users_service_1.UsersService])
                ], UsersComponent);
                return UsersComponent;
            }());
            exports_1("UsersComponent", UsersComponent);
        }
    }
});
//# sourceMappingURL=users.component.js.map