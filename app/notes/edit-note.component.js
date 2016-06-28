System.register(['@angular/core', 'primeng/primeng', '../services/notes.service'], function(exports_1, context_1) {
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
    var core_1, primeng_1, primeng_2, notes_service_1;
    var EditNoteRequest, EditNoteComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
                primeng_2 = primeng_1_1;
            },
            function (notes_service_1_1) {
                notes_service_1 = notes_service_1_1;
            }],
        execute: function() {
            EditNoteRequest = (function () {
                function EditNoteRequest() {
                }
                return EditNoteRequest;
            }());
            exports_1("EditNoteRequest", EditNoteRequest);
            EditNoteComponent = (function () {
                function EditNoteComponent(_notesService, zone) {
                    this._notesService = _notesService;
                    this.zone = zone;
                    this.errorMessage = "";
                    this.heading = "EDIT NOTES";
                    this.editNoteRequest = {
                        ID: 0,
                        Title: '',
                        Description: '',
                    };
                }
                EditNoteComponent.prototype.ngOnInit = function () {
                    this.editNoteRequest.Title = this.title;
                    this.editNoteRequest.Description = this.description;
                    this.editNoteRequest.ID = this.id;
                };
                EditNoteComponent.prototype.Save = function () {
                    var _this = this;
                    this._notesService.editNote(this.editNoteRequest)
                        .subscribe(function (note) {
                        var result = JSON.parse(note._body);
                        window.timelineComponentRef.zone.run(function () { window.timelineComponentRef.component.toggleOpenEditNoteWithoutEvent(result); });
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                    }, function () { return function () {
                        console.log("Done");
                    }; });
                };
                EditNoteComponent.prototype.Close = function () {
                };
                EditNoteComponent = __decorate([
                    core_1.Component({
                        selector: 'edit-note',
                        inputs: ['title', 'description', 'id'],
                        templateUrl: './app/notes/edit-note.component.html',
                        providers: [
                            notes_service_1.NotesService
                        ],
                        directives: [primeng_1.Editor, primeng_2.Header]
                    }), 
                    __metadata('design:paramtypes', [notes_service_1.NotesService, core_1.NgZone])
                ], EditNoteComponent);
                return EditNoteComponent;
            }());
            exports_1("EditNoteComponent", EditNoteComponent);
        }
    }
});
//# sourceMappingURL=edit-note.component.js.map