System.register(["@angular/core"], function(exports_1, context_1) {
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
    var FileUploaderComponent, FileToUpload;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            FileUploaderComponent = (function () {
                function FileUploaderComponent() {
                }
                FileUploaderComponent.prototype.fileChangeEvent = function (event) {
                    var files = event.srcElement.files;
                    this.updateLocalObject(files);
                    this.showFilePreview(files);
                };
                FileUploaderComponent.prototype.updateLocalObject = function (files) {
                    for (var index = 0; index < files.length; index++) {
                        var newFile = new FileToUpload();
                        // newFile.id = index;
                        newFile.file = files[index];
                        this.filesToUpload.push(newFile);
                    }
                };
                FileUploaderComponent.prototype.showFilePreview = function (files) {
                    var _this = this;
                    var reader = []; // create empt array for readers
                    for (var index = 0; index < files.length; index++) {
                        reader.push(new FileReader());
                        reader[index].addEventListener("load", function (event) {
                            var matchingIndex = _this.filesToUpload.findIndex(function (x) { return x.file.name == files[0].name; });
                            var a = event.target.result;
                            _this.filesToUpload[matchingIndex].previwSrc = event.target.result;
                        }, false);
                        if (files[index]) {
                            reader[index].readAsDataURL(files[index]);
                        }
                    }
                };
                FileUploaderComponent.prototype.removeFile = function (file) {
                    debugger;
                    var index = this.filesToUpload.findIndex(function (x) { return x === file; });
                    this.filesToUpload.splice(index, 1);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], FileUploaderComponent.prototype, "filesToUpload", void 0);
                FileUploaderComponent = __decorate([
                    core_1.Component({
                        selector: 'file-uploader',
                        templateUrl: './app/fileuploader/file-uploader.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], FileUploaderComponent);
                return FileUploaderComponent;
            }());
            exports_1("FileUploaderComponent", FileUploaderComponent);
            FileToUpload = (function () {
                function FileToUpload() {
                }
                return FileToUpload;
            }());
            exports_1("FileToUpload", FileToUpload);
        }
    }
});
//# sourceMappingURL=file-uploader.component.js.map