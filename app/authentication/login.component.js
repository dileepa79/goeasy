System.register(['@angular/core', '../services/auth.service', '../app.component'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, auth_service_1, app_component_1;
    var UserDetails, LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            UserDetails = (function () {
                function UserDetails() {
                }
                return UserDetails;
            }());
            exports_1("UserDetails", UserDetails);
            LoginComponent = (function () {
                function LoginComponent(_authService, _parent) {
                    this._authService = _authService;
                    this._parent = _parent;
                    this.showLoginHtml = false;
                    this.userDetails = {
                        username: '',
                        password: '',
                        rememberMe: false
                    };
                    this.errorMsg = '';
                }
                LoginComponent.prototype.ngOnInit = function () {
                    if (this._authService.loginUsingCookies() == false) {
                        this.showLoginHtml = true;
                        return;
                    }
                };
                LoginComponent.prototype.login = function () {
                    var _this = this;
                    this.errorMsg = '';
                    this._authService.login(this.userDetails.username, this.userDetails.password, this.userDetails.rememberMe).subscribe(function (data) {
                        //console.log("access token: "+data.access_token)
                        _this._authService.setToken(data.access_token);
                        _this._authService.setTokenExpiresIn(data.expires_in);
                    }, function (err) {
                        console.log("error: " + JSON.stringify(err));
                        _this._authService.setAuthorized(false);
                        _this.errorMsg = 'Oops, the username or password entered is wrong. May be you have pressed a wrong key..';
                        //alert(JSON.parse(err._body).error_description);
                    }, function () {
                        _this.errorMsg = '';
                        _this._authService.setCookies(_this.userDetails.username, _this.userDetails.password, _this.userDetails.rememberMe);
                    });
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
                        ],
                        styles: [' .login-content { height: 100vh; position: fixed; left:0; top: 0; margin-bottom: 110px;}', '.login-logo { padding: 33vh 0 0 0;}'],
                    }),
                    __param(1, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService, app_component_1.AppComponent])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map