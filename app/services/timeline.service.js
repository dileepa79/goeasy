System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', './auth.service'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, auth_service_1;
    var TimeLineService;
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
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            TimeLineService = (function () {
                function TimeLineService(http, _authService) {
                    this.http = http;
                    this._authService = _authService;
                }
                TimeLineService.prototype.getTimeLines = function () {
                    var header = this._authService.getHeader();
                    return this.http.get('http://localhost:54736/api/TimeLine')
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                TimeLineService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                TimeLineService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService])
                ], TimeLineService);
                return TimeLineService;
            }());
            exports_1("TimeLineService", TimeLineService);
        }
    }
});
//# sourceMappingURL=timeline.service.js.map