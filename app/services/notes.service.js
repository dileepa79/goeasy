System.register(['angular2/core', 'angular2/http', 'angular2/router', '../app.constants', './auth.service'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, app_constants_1, auth_service_1;
    var NotesService;
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
            function (app_constants_1_1) {
                app_constants_1 = app_constants_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            NotesService = (function () {
                function NotesService(_router, http, _configuration, _authService) {
                    this._router = _router;
                    this.http = http;
                    this._configuration = _configuration;
                    this._authService = _authService;
                    this.tags = '';
                    this.webApiUrl = _configuration.ServerWithApiUrl + 'Note';
                }
                //public addNote(noteRequest) {
                //    console.log("Title: " + noteRequest.title + ", description: " + noteRequest.description);
                //    var headers = new Headers();
                //    headers.append('Content-Type', 'application/json');
                //    this.http.post('http://localhost:54736/api/Note',
                //        JSON.stringify(noteRequest),
                //        { headers: headers })
                //        .map((res: Response) => res.json())
                //        .subscribe((res: noteRequest) => this.postResponse = res);
                //}
                NotesService.prototype.addNote = function (noteRequest) {
                    var _this = this;
                    console.log("Title: " + noteRequest.title + ", description: " + noteRequest.description);
                    var body = JSON.stringify(noteRequest);
                    //var headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
                    var headers = this._authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_1.RequestOptions({ headers: headers });
                    this.http.post(this.webApiUrl + '/AddNote', body, options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        console.log("added note: " + data);
                    }, function (err) { return console.log("error: " + JSON.stringify(err)); }, function () {
                        for (var i = 0; i < noteRequest.tags.length; i++) {
                            _this.tags = _this.tags + (noteRequest.tags[i] + (noteRequest.tags.length != i + 1 ? ',' : ''));
                        }
                        _this._router.navigate(['TimeLine', { tags: _this.tags }]);
                    });
                };
                NotesService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.Router, http_1.Http, app_constants_1.Configuration, auth_service_1.AuthService])
                ], NotesService);
                return NotesService;
            }());
            exports_1("NotesService", NotesService);
        }
    }
});
//# sourceMappingURL=notes.service.js.map