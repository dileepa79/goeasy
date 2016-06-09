System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var TokenService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TokenService = (function () {
                function TokenService() {
                }
                TokenService.prototype.getToken = function () {
                    //return this._token;
                    return this.getCookie("yaytoken");
                };
                TokenService.prototype.setToken = function (token) {
                    this.setCookie("yaytoken", token, 14);
                    //this._token = token;
                };
                TokenService.prototype.getTokenFromCookie = function () {
                    return this.getCookie("yaytoken");
                };
                TokenService.prototype.setTokenToCookie = function (token, expiredIn) {
                    this.setCookie("yaytoken", token, expiredIn);
                };
                TokenService.prototype.removeToken = function () {
                    this.delete_cookie("yaytoken");
                };
                TokenService.prototype.getCookie = function (cname) {
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
                TokenService.prototype.setCookie = function (cname, cvalue, exdays) {
                    var d = new Date();
                    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                    var expires = "expires=" + d.toUTCString();
                    document.cookie = cname + "=" + cvalue + "; " + expires;
                };
                TokenService.prototype.delete_cookie = function (name) {
                    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                };
                TokenService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], TokenService);
                return TokenService;
            }());
            exports_1("TokenService", TokenService);
        }
    }
});
//# sourceMappingURL=token.service.js.map