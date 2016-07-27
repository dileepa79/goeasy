System.register(['@angular/core', 'primeng/primeng', '../services/tags.service'], function(exports_1, context_1) {
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
    var core_1, primeng_1, tags_service_1;
    var NoteEditorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            },
            function (tags_service_1_1) {
                tags_service_1 = tags_service_1_1;
            }],
        execute: function() {
            NoteEditorComponent = (function () {
                function NoteEditorComponent(tagService) {
                    this.tagService = tagService;
                    this.tags = [];
                    this.newTags = [];
                    this.tagsAddedEditor = new core_1.EventEmitter();
                    this.tagsAddedDescription = new core_1.EventEmitter();
                }
                NoteEditorComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (typeof this.filteredtagsMultiple == 'undefined') {
                        this.filteredtagsMultiple = new Array();
                    }
                    if (typeof this.tags == 'undefined') {
                        this.tags = new Array();
                    }
                    else {
                        this.tags = [];
                    }
                    if (typeof this.newTags == 'undefined') {
                        this.newTags = new Array();
                    }
                    else {
                        this.newTags = [];
                    }
                    if (this.filteredtagsMultiple.length == 0) {
                        this.tagService.getTags().then(function (tags) {
                            _this.filteredtagsMultiple = tags;
                        });
                    }
                };
                NoteEditorComponent.prototype.OnTextChange = function (event) {
                    this.isFocus = false;
                    console.log(event.textValue);
                    console.log(event.htmlValue);
                    console.log(event.delta);
                    console.log(event.hashValue);
                    var textLength = event.textValue.length;
                    var query = event.textValue;
                    var checkEmpty = query;
                    this.existingTag = "";
                    checkEmpty = checkEmpty.replace(/(\r\n|\n|\r|\s)/gm, "");
                    var index, text, isDelete;
                    if (event.delta.ops.length == 1) {
                        index = 0;
                        if (typeof event.delta.ops[0].insert == 'undefined') {
                            isDelete = 1;
                        }
                        else {
                            text = event.delta.ops[0].insert;
                        }
                    }
                    else if (event.delta.ops.length == 2) {
                        index = event.delta.ops[0].retain;
                        if (typeof event.delta.ops[1].insert == 'undefined') {
                            isDelete = 1;
                        }
                        else {
                            text = event.delta.ops[1].insert;
                        }
                    }
                    var tagsArray = query.slice(0, -1).split(/\s/);
                    //var regexp = /(\b[a-z\d\.\^\$\*\+\?\(\{\\\|\@]*\b)\s$/gi;
                    var isAdded = false;
                    if (event.hashValue != "") {
                        this.tags.push(event.hashValue);
                        this.newTags.push(event.hashValue);
                        isAdded = true;
                    }
                    else if (textLength == index + 2 && text == " " && event.hashValue == "") {
                        var count = tagsArray.length;
                        var item = tagsArray[count - 2];
                        for (var u = 0; u < this.filteredtagsMultiple.length; u++) {
                            var tag = this.filteredtagsMultiple[u];
                            if (tag != undefined && tag.name != null) {
                                if (tag.name.toLowerCase().trim() == item.toLowerCase().trim()) {
                                    this.tags.push(tag.name);
                                    this.indexValue = index;
                                    this.existingTag = tag.name;
                                    isAdded = true;
                                    break;
                                }
                            }
                        }
                        if (!isAdded) {
                            for (var u = 0; u < this.filteredtagsMultiple.length; u++) {
                                var tag = this.filteredtagsMultiple[u];
                                if (tag != undefined && tag.name != null) {
                                    var regex = new RegExp('\\b' + tag.name.toLowerCase().trim() + '\\b');
                                    var index = query.toLowerCase().search(regex);
                                    if (index > -1) {
                                        this.tags.push(tag.name);
                                        this.indexValue = index;
                                        this.existingTag = tag.name;
                                    }
                                    else {
                                        var indexRemove = this.tags.indexOf(tag.name);
                                        if (indexRemove >= 0) {
                                            this.tags.splice(indexRemove, 1);
                                        }
                                    }
                                    isAdded = true;
                                }
                            }
                        }
                    }
                    var newText = query;
                    if (textLength > index + 2 || (isDelete && (newText.slice(-2, -1) == " " || newText.trim().length == 0))) {
                        for (var u = 0; u < this.filteredtagsMultiple.length; u++) {
                            var tag = this.filteredtagsMultiple[u];
                            if (tag != undefined && tag.name != null) {
                                var regex = new RegExp('\\b' + tag.name.toLowerCase().trim() + '\\b');
                                var index = query.toLowerCase().search(regex);
                                if (index > -1) {
                                    this.tags.push(tag.name);
                                    this.indexValue = index;
                                    this.existingTag = tag.name;
                                }
                                else {
                                    var indexRemove = this.tags.indexOf(tag.name);
                                    if (indexRemove >= 0) {
                                        this.tags.splice(indexRemove, 1);
                                    }
                                }
                                isAdded = true;
                            }
                        }
                    }
                    if (isDelete) {
                        for (var u = 0; u < this.newTags.length; u++) {
                            var tag = this.newTags[u];
                            var regex = new RegExp('\\b' + tag.toLowerCase().trim() + '\\b');
                            var index = query.toLowerCase().search(regex);
                            if (index == -1) {
                                var indexRemove = this.newTags.indexOf(tag);
                                if (indexRemove >= 0) {
                                    this.newTags.splice(indexRemove, 1);
                                }
                                indexRemove = this.tags.indexOf(tag);
                                if (indexRemove >= 0) {
                                    this.tags.splice(indexRemove, 1);
                                }
                            }
                        }
                    }
                    if (isAdded) {
                        var uniqueArray = this.removeDuplicates(this.tags);
                        this.tags = uniqueArray;
                        this.isFocus = true;
                        this.tagsAddedEditor.emit(uniqueArray);
                        this.tagsAddedDescription.emit(event.htmlValue);
                    }
                };
                NoteEditorComponent.prototype.OnSelectionChange = function (event) {
                    var x = event.text.replace(/(\r\n|\n|\r)/gm, "");
                    var edDescription = x.replace(/\//g, ' ');
                    var tagsArray = [];
                    var tagsReturn = [];
                    var existingTags = [];
                    var inputString = '';
                    tagsArray = x.trim().split('/');
                    var i = 0;
                    for (var s = 0; s < tagsArray.length; s++) {
                        var z = (s % 2);
                        inputString = tagsArray[s].trim();
                        inputString = inputString.replace(/[^a-zA-Z0-9\s]/g, "");
                        if (inputString.length > 0) {
                            var isIncrement = false;
                            if (z == 1) {
                                tagsReturn[i] = tagsArray[s].trim();
                            }
                            if (z == 0) {
                                console.log(this.filteredtagsMultiple);
                                for (var u = 0; u < this.filteredtagsMultiple.length; u++) {
                                    var tag = this.filteredtagsMultiple[u];
                                    if (tag != undefined && tag.name != null) {
                                        var posArray = tagsArray[s].trim().split(/\s/);
                                        if (posArray.length > 1) {
                                            isIncrement = true;
                                            var regex = new RegExp('\\b' + tag.name.toLowerCase().trim() + '\\b');
                                            var index = tagsArray[s].toLowerCase().search(regex);
                                            if (index > -1) {
                                                tagsReturn[i] = tag.name;
                                                i = i + 1;
                                            }
                                        }
                                        else {
                                            if (tag.name.toLowerCase().indexOf(tagsArray[s].toLowerCase().trim()) !== -1 && tag.name.trim().length == tagsArray[s].trim().length) {
                                                tagsReturn[i] = tag.name;
                                            }
                                        }
                                    }
                                }
                            }
                            if (!isIncrement)
                                i = i + 1;
                        }
                    }
                    var uniqueArray = this.removeDuplicates(tagsReturn);
                    this.tagsAddedEditor.emit(uniqueArray);
                    this.tagsAddedDescription.emit(edDescription);
                };
                NoteEditorComponent.prototype.removeDuplicates = function (num) {
                    var x, len = num.length, out = [], obj = {};
                    for (x = 0; x < len; x++) {
                        obj[num[x]] = 0;
                    }
                    for (x in obj) {
                        if (x != 'undefined')
                            out.push(x);
                    }
                    return out;
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], NoteEditorComponent.prototype, "tagsAddedEditor", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], NoteEditorComponent.prototype, "tagsAddedDescription", void 0);
                NoteEditorComponent = __decorate([
                    core_1.Component({
                        selector: 'prime-editor',
                        template: "\n        <p-editor (onTextChange)=\"OnTextChange($event)\" [isFocus]=\"isFocus\" [existingTag]=\"existingTag\" [indexValue]=\"indexValue\"> \n        </p-editor>\n    ",
                        directives: [primeng_1.Editor],
                        providers: [tags_service_1.TagsService]
                    }), 
                    __metadata('design:paramtypes', [tags_service_1.TagsService])
                ], NoteEditorComponent);
                return NoteEditorComponent;
            }());
            exports_1("NoteEditorComponent", NoteEditorComponent);
        }
    }
});
//# sourceMappingURL=note-editor.component.js.map