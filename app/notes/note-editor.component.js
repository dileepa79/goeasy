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
                    //tags: TagsResponse[] = []
                    this.tagsAddedEditor = new core_1.EventEmitter();
                    this.tagsAddedDescription = new core_1.EventEmitter();
                }
                // @Output() tagsRemoved: EventEmitter<TagsResponse[]> = new EventEmitter<TagsResponse[]>();
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
                    var isAdded = false;
                    if (event.hashValue != "") {
                        this.tags.push(event.hashValue);
                        isAdded = true;
                    }
                    if (textLength == index + 2 && text == " ") {
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
                    }
                    if (textLength > index + 2 || isDelete) {
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
                    var uniqueArray = this.removeDuplicates(this.tags);
                    this.tags = uniqueArray;
                    if (isAdded) {
                        this.isFocus = true;
                        this.tagsAddedEditor.emit(uniqueArray);
                        this.tagsAddedDescription.emit(event.htmlValue);
                    }
                };
                //    var splitArray = query.split('/');
                //    if (splitArray.length == 3) {
                //        this.tagsArray.push(splitArray[1]);
                //        var param = splitArray[1].trim();
                //        var searchText = "/" + param + "/";
                //        var htmlString = event.htmlValue;
                //        if (htmlString.indexOf(searchText) !== -1) {
                //            // searchText = "\/" + searchText + "\/"+ "gi";
                //            xx = htmlString.replace(searchText, '<b>' + param + '</b>');
                //        }
                //        //  this.inputHTMLValue = xx;
                //    }
                //    // this.inputValue = event.textValue;
                //}
                //var htmlString = event.htmlValue;//"<div><b>xbc</b></div>"
                //this.inputHTMLValue = htmlString;
                //var firstIndex = inputString.indexOf('/');
                //if (firstIndex != -1)
                //{
                // var secondIndex = inputString.indexOf('/',firstIndex);
                // }
                // if (secondIndex != -1) {
                //  var textEntered = inputString.substring(firstIndex, secondIndex);
                // var text1 = event.htmlValue.replace(/(<([^>]+)>)/ig, "").trim();
                // var replaced = text1.search(param) >= 0;
                // if (replaced) {
                //     document.body.innerHTML = text1.replace(param, '*' + param + '*');
                //  } else {
                //param was not replaced   //What to do here?
                //   }
                // this.filtertag(query, this.filteredtagsMultiple);
                //   }
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
                                            //for (let v = 0; v < posArray.length; v++) {
                                            //    if (tag.name.toLowerCase().indexOf(posArray[v].toLowerCase().trim()) !== -1 && tag.name.trim().length == posArray[v].trim().length) {
                                            //        tagsReturn[i] = tag.name;
                                            //        i = i + 1;
                                            //    }
                                            //}
                                            //if (tagsArray[s].toLowerCase().indexOf(tag.name.toLowerCase().trim()) !== -1 && tag.name.trim().length < tagsArray[s].trim().length) {
                                            //    tagsReturn[i] = tag.name;
                                            //    i = i + 1;
                                            //}
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
                NoteEditorComponent.prototype.filterTag = function () {
                    console.log("dsfdsf");
                    //for (let i = 0; i < tags.length; i++) {
                    //}
                    //for (let i = 0; i < tags.length; i++) {
                    //    let tag = tags[i];
                    //    if (tag != undefined && tag.name != null) {
                    //        if (tag.name.toLowerCase().match(query.toLowerCase())[0]) {
                    //            return true;
                    //        }
                    //        else {
                    //            return false;
                    //        }
                    //    }
                    //    else {
                    //        return false;}
                    //}
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