System.register(['@angular/core', '@angular/http', 'rxjs/Observable', '../app.constants', './auth.service'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, app_constants_1, auth_service_1;
    var TagIdentityService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (app_constants_1_1) {
                app_constants_1 = app_constants_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            TagIdentityService = (function () {
                function TagIdentityService(http, _authService, _configuration) {
                    this.http = http;
                    this._authService = _authService;
                    this._configuration = _configuration;
                    this.webApiUrl = _configuration.ServerWithApiUrl + 'tagIdentity';
                    this.authService = _authService;
                }
                TagIdentityService.prototype.GetById = function (id) {
                    return this.http.get(this.webApiUrl + "?id=" + id)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                TagIdentityService.prototype.getTags = function () {
                    var headers = this.authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.webApiUrl, options)
                        .toPromise()
                        .then(function (res) { return res.json().data; })
                        .then(function (data) { return data; });
                };
                TagIdentityService.prototype.getAllTags = function () {
                    var headers = this.authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.webApiUrl, options)
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                TagIdentityService.prototype.addTag = function (tagIdentityRequest) {
                    console.log("TagIdentity: " + tagIdentityRequest);
                    var body = JSON.stringify(tagIdentityRequest);
                    console.log('body:' + body);
                    var headers = this.authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(this.webApiUrl, body, options)
                        .map(function (res) {
                        // If request fails, throw an Error that will be caught
                        if (res.status < 200 || res.status >= 300) {
                            throw new Error('This request has failed ' + res.status);
                        }
                        else {
                            return "ok"; //return <tagIdentity>res.json();
                        }
                    })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                TagIdentityService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                TagIdentityService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService, app_constants_1.Configuration])
                ], TagIdentityService);
                return TagIdentityService;
            }());
            exports_1("TagIdentityService", TagIdentityService);
        }
    }
});
//# sourceMappingURL=tag.identity.service.js.map