System.register(['angular2/core', 'angular2/http', 'angular2/router', './token.service', '../app.component', '../app.constants'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, token_service_1, app_component_1, app_constants_1;
    var AuthService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (token_service_1_1) {
                token_service_1 = token_service_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (app_constants_1_1) {
                app_constants_1 = app_constants_1_1;
            }],
        execute: function() {
            AuthService = (function () {
                function AuthService(_router, http, tokenService, _configuration, _parent) {
                    this._router = _router;
                    this.http = http;
                    this.tokenService = tokenService;
                    this._configuration = _configuration;
                    this._parent = _parent;
                    this._token = '';
                    this.webApiUrl = _configuration.Server + 'Token';
                }
                AuthService.prototype.login = function (username, password, rememberMe) {
                    var _this = this;
                    console.log("username: " + username + ", password: " + password + ", remember me: " + rememberMe);
                    var _username = 'test@test.com';
                    var _password = 'teST@123';
                    var grant_type = 'password';
                    var creds = "grant_type=" + grant_type + "&userName=" + username + "&password=" + password;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    this.http.post(this.webApiUrl, creds, {
                        headers: headers
                    })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        //console.log("access token: "+data.access_token)
                        _this._token = data.access_token;
                    }, function (err) {
                        console.log("error: " + JSON.stringify(err));
                        _this._parent.isAuthorized = false;
                        alert(JSON.parse(err._body).error_description);
                    }, function () {
                        _this.tokenService.setToken(_this._token);
                        _this._parent.isAuthorized = true;
                        if (rememberMe) {
                            console.log("saving credentials in cookie");
                            //document.cookie = "username=" + username;
                            //document.cookie = "password=" + password;
                            _this.setCookie("username", username, 15);
                            _this.setCookie("password", password, 15);
                        }
                        _this._router.navigate(['Dashboard']);
                    });
                };
                AuthService.prototype.isAuth = function () {
                    return this.tokenService.getToken() != '' && this.tokenService.getToken() != null;
                };
                AuthService.prototype.get = function (url, callback) {
                    var authHeader = new http_1.Headers();
                    authHeader.append('Authorization', 'bearer ' + this.tokenService.getToken());
                    this.http.get(url, {
                        headers: authHeader
                    })
                        .map(function (res) { return res.text(); })
                        .subscribe(function (data) { return callback(data); }, function (err) { return console.log("error: " + JSON.stringify(err)); }, function () { return console.log('Secret Quote Complete'); });
                };
                AuthService.prototype.getHeader = function () {
                    var authHeader = new http_1.Headers();
                    authHeader.append('Authorization', 'bearer ' + this.tokenService.getToken());
                    return authHeader;
                };
                AuthService.prototype.setCookie = function (cname, cvalue, exdays) {
                    var d = new Date();
                    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                    var expires = "expires=" + d.toUTCString();
                    document.cookie = cname + "=" + cvalue + "; " + expires;
                };
                AuthService.prototype.loginUsingCookies = function () {
                    var userName = this.getCookie("username");
                    var password = this.getCookie("password");
                    if (userName == null || userName == '' || password == null || password == '')
                        return false;
                    this.login(userName, password, true);
                };
                AuthService.prototype.getCookie = function (cname) {
                    var name = cname + "=";
                    var ca = document.cookie.split(';');
                    for (var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) == ' ') {
                            c = c.substring(1);
                        }
                        if (c.indexOf(name) == 0) {
                            return c.substring(name.length, c.length);
                        }
                    }
                    return "";
                };
                AuthService.prototype.logout = function () {
                    console.log("logout");
                    this.tokenService.removeToken();
                    this.delete_cookie("username");
                    this.delete_cookie("password");
                    this._parent.isAuthorized = false;
                    this._router.navigate(['Login']);
                };
                AuthService.prototype.delete_cookie = function (name) {
                    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                };
                AuthService = __decorate([
                    core_1.Injectable(),
                    __param(4, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))), 
                    __metadata('design:paramtypes', [router_1.Router, http_1.Http, token_service_1.TokenService, app_constants_1.Configuration, app_component_1.AppComponent])
                ], AuthService);
                return AuthService;
            }());
            exports_1("AuthService", AuthService);
        }
    }
});
//# sourceMappingURL=auth.service.js.map