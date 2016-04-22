System.register(['angular2/core', '../services/auth.service'], function(exports_1, context_1) {
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
    var core_1, auth_service_1;
    var UserDetails, LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            UserDetails = (function () {
                function UserDetails() {
                }
                return UserDetails;
            }());
            exports_1("UserDetails", UserDetails);
            LoginComponent = (function () {
                function LoginComponent(_authService) {
                    this._authService = _authService;
                    this.userDetails = {
                        username: 'test@test.com',
                        password: 'teST@123'
                    };
                }
                LoginComponent.prototype.login = function () {
                    this._authService.login(this.userDetails.username, this.userDetails.password);
                };
                LoginComponent.prototype.getValues = function () {
                    this._authService.get('http://localhost:18077/api/values', function (data) {
                        console.log(JSON.stringify(data));
                    });
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login',
                        templateUrl: '../app/authentication/login.component.html',
                        providers: [
                            auth_service_1.AuthService
                        ]
                    }), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map