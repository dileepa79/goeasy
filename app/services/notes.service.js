System.register(['@angular/core', '@angular/http', 'rxjs/Observable', '@angular/router', '../app.constants', './auth.service'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, router_1, app_constants_1, auth_service_1;
    var NotesService;
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
                    //console.log("Title: " + noteRequest.title + ", description: " + noteRequest.description);
                    //var body = JSON.stringify(noteRequest);
                    ////var headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
                    //var headers = this._authService.getHeader();
                    //headers.append('Content-Type', 'application/json; charset=utf-8');
                    //var options = new RequestOptions({ headers: headers });
                    //return this.http.post(this.webApiUrl + '/AddNote', body, options)
                    //    .map(res => res.json())
                    //    .do(data => console.log(data))
                    //    .catch(this.handleError);
                    var apiUrl = this.webApiUrl + '/AddNoteWithAttachments';
                    // var apiUrl = this.webApiUrl + '/AddNote';
                    return this.callApi(apiUrl, noteRequest);
                };
                NotesService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                NotesService.prototype.callApi = function (url, noteRequest) {
                    // Create FormData object and attach files and other data into it and send to api
                    // as angulr 2 still not support sending files to backend
                    // We can change this once angular 2 support it
                    var _this = this;
                    var key = this.getAuthToken();
                    return Observable_1.Observable.create(function (observer) {
                        var formData = new FormData(), xhr = new XMLHttpRequest();
                        // for (let i = 0; i < files.length; i++) {
                        formData.append("title", noteRequest.title);
                        formData.append("tags", noteRequest.tags);
                        formData.append("users", noteRequest.users);
                        formData.append("description", noteRequest.description);
                        for (var _i = 0, _a = noteRequest.filesToUpload; _i < _a.length; _i++) {
                            var item = _a[_i];
                            //formData.append("file", noteRequest.filesToUpload[0]);
                            formData.append("file", item.file);
                        }
                        // var files = noteRequest.filesToUpload[0].file;
                        // formData.append("file", files);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 201) {
                                    observer.next(JSON.parse(xhr.response));
                                    observer.complete();
                                }
                                else {
                                    observer.error(_this.handleError);
                                }
                            }
                        };
                        //we might need to show the progress later
                        //xhr.upload.onprogress = (event) => {
                        //    this.progress = Math.round(event.loaded / event.total * 100);
                        //    this.progressObserver.next(this.progress);
                        //};
                        xhr.open('POST', url, true);
                        xhr.setRequestHeader('Authorization', 'Bearer ' + key);
                        xhr.send(formData);
                    });
                };
                NotesService.prototype.getAuthToken = function () {
                    var headers = this._authService.getHeader();
                    var key = headers._headersMap.entries().next().value[1][0].slice(7);
                    return key;
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