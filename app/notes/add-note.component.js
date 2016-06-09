System.register(['@angular/core', './note-request', '../services/notes.service', '../tags/tags-selector.component', '../noteshareusers/users-selector.component', '../modal/modaldialog', 'primeng/primeng', '@angular/router', '../services/passtag.service', '../fileuploader/file-uploader.component'], function(exports_1, context_1) {
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
    var core_1, note_request_1, notes_service_1, tags_selector_component_1, users_selector_component_1, modaldialog_1, primeng_1, primeng_2, router_1, passtag_service_1, file_uploader_component_1;
    var AddNoteComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (note_request_1_1) {
                note_request_1 = note_request_1_1;
            },
            function (notes_service_1_1) {
                notes_service_1 = notes_service_1_1;
            },
            function (tags_selector_component_1_1) {
                tags_selector_component_1 = tags_selector_component_1_1;
            },
            function (users_selector_component_1_1) {
                users_selector_component_1 = users_selector_component_1_1;
            },
            function (modaldialog_1_1) {
                modaldialog_1 = modaldialog_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
                primeng_2 = primeng_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (passtag_service_1_1) {
                passtag_service_1 = passtag_service_1_1;
            },
            function (file_uploader_component_1_1) {
                file_uploader_component_1 = file_uploader_component_1_1;
            }],
        execute: function() {
            AddNoteComponent = (function () {
                function AddNoteComponent(_notesService, _router, _passTagService, zone) {
                    this._notesService = _notesService;
                    this._router = _router;
                    this._passTagService = _passTagService;
                    this.zone = zone;
                    this.noteRequest = {
                        title: '',
                        description: '',
                        tags: [],
                        users: [],
                        filesToUpload: [],
                        attachments: []
                    };
                    this.heading = "ADD NOTES";
                    this.tags = [];
                    this.users = [];
                    this.tagList = '';
                    this.active = true;
                    this.tagsStr = '';
                    this.passedTags = [];
                    this.showCloseButton = false;
                    window.angularComponentRef = {
                        zone: this.zone,
                        // componentFn: (value) => this.callFromOutside(value), 
                        component: this
                    };
                }
                AddNoteComponent.prototype.ngOnInit = function () {
                };
                AddNoteComponent.prototype.Save = function () {
                    var _this = this;
                    if (this.noteRequest.tags && this.noteRequest.tags.length == 0) {
                        this.noteRequest.tags = $('#tagInput').text().split(",");
                    }
                    this._notesService.addNote(this.noteRequest)
                        .subscribe(function (note) {
                        for (var i = 0; i < note.tags.length; i++) {
                            _this.tagList = _this.tagList + (note.tags[i].name + (note.tags.length != i + 1 ? ',' : ''));
                        }
                        _this.clear();
                        _this._router.navigate(['/timeline', { tags: _this.tagList }]);
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                    }, function () { return function () { return console.log("Done"); }; });
                };
                AddNoteComponent.prototype.Share = function () {
                    console.log('Share This Note');
                };
                AddNoteComponent.prototype.onSelectedTagsChanged = function (tags) {
                    this.noteRequest.tags = tags.map(function (d) { return d['name']; });
                };
                AddNoteComponent.prototype.onSelectedUsersChanged = function (users) {
                    this.noteRequest.users = users.map(function (d) { return d['userName']; });
                };
                AddNoteComponent.prototype.clear = function () {
                    var _this = this;
                    this.noteRequest = new note_request_1.NoteRequest('', '', [], []);
                    this.active = false;
                    setTimeout(function () { return _this.active = true; }, 0);
                };
                AddNoteComponent.prototype.updateSelectedTags = function () {
                    this.tagsStr = this._passTagService.getTags();
                    console.log('calledFromOutside ' + this._passTagService.getTags());
                    if (this.tagsStr != null) {
                        var tagsArr = this.tagsStr.split(",");
                        for (var i = 0; i < tagsArr.length; i++) {
                            var tag = tagsArr[i];
                            this.passedTags.push(tag);
                        }
                        this.noteRequest.tags = this.passedTags;
                    }
                    console.log('calledFromOutside tags ' + this.noteRequest.tags);
                };
                AddNoteComponent.prototype.Close = function () {
                    this.clear();
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], AddNoteComponent.prototype, "showCloseButton", void 0);
                AddNoteComponent = __decorate([
                    core_1.Component({
                        selector: 'add-note',
                        templateUrl: './app/notes/add-note.component.html',
                        providers: [
                            notes_service_1.NotesService
                        ],
                        directives: [tags_selector_component_1.TagsSelectorComponent, modaldialog_1.MODAL_DIRECTIVES, primeng_1.Editor, primeng_2.Header, users_selector_component_1.UsersSelectorComponent, file_uploader_component_1.FileUploaderComponent]
                    }), 
                    __metadata('design:paramtypes', [notes_service_1.NotesService, router_1.Router, passtag_service_1.PassTagService, core_1.NgZone])
                ], AddNoteComponent);
                return AddNoteComponent;
            }());
            exports_1("AddNoteComponent", AddNoteComponent);
        }
    }
});
//# sourceMappingURL=add-note.component.js.map