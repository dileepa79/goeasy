import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Editor} from 'primeng/primeng';
import { TagsService } from '../services/tags.service';
import { TagsResponse } from '../tags/tags-response';
@Component({
    selector: 'prime-editor',

    template: `
        <p-editor (onTextChange)="OnTextChange($event)" [isFocus]="isFocus" [existingTag]="existingTag" [indexValue]="indexValue"> 
        </p-editor>
    `,
    directives: [Editor],
    providers: [TagsService]
})

//interface String {
//    trim(): string;
//}

//String.prototype.trim = function () {
//    return this.replace(/^\s+|\s+$/g, "");
//}
export class NoteEditorComponent implements OnInit {
    constructor(private tagService: TagsService) { }
    filteredtagsMultiple: any[];
    filtered: any[];
    tags: any[] = [];
    newTags: any[] = [];
    inputValue: string;
    inputHTMLValue: string;
    isFocus: boolean;
    existingTag: string;
    indexValue: number;
    //tags: TagsResponse[] = []

    @Output() tagsAddedEditor: EventEmitter<any> = new EventEmitter<any>();
    @Output() tagsAddedDescription: EventEmitter<string> = new EventEmitter<string>();
    // @Output() tagsRemoved: EventEmitter<TagsResponse[]> = new EventEmitter<TagsResponse[]>();

    ngOnInit() {
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
            this.tagService.getTags().then(tags => {
                this.filteredtagsMultiple = tags;
            });
        }
    }

    OnTextChange(event) {
        this.isFocus = false;
        console.log(event.textValue);
        console.log(event.htmlValue);
        console.log(event.delta);
        console.log(event.hashValue);
        var textLength = event.textValue.length;
        let query = event.textValue;
        let checkEmpty = query;
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
        var isAdded = false;
        if (event.hashValue != "") {
            this.tags.push(event.hashValue);
            this.newTags.push(event.hashValue);
            isAdded = true;
        }
        else if (textLength == index + 2 && text == " " && event.hashValue == "") {
            var count = tagsArray.length;
            var item = tagsArray[count - 2];
            for (let u = 0; u < this.filteredtagsMultiple.length; u++) {
                let tag = this.filteredtagsMultiple[u];
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
                for (let u = 0; u < this.filteredtagsMultiple.length; u++) {
                    let tag = this.filteredtagsMultiple[u];
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
            for (let u = 0; u < this.newTags.length; u++) {
                let tag = this.newTags[u];
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
    }



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

    OnSelectionChange(event) {
        var x = event.text.replace(/(\r\n|\n|\r)/gm, "");
        var edDescription = x.replace(/\//g, ' ')
        var tagsArray: any[] = [];
        var tagsReturn: any[] = [];
        var existingTags: any[] = [];
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
                    for (let u = 0; u < this.filteredtagsMultiple.length; u++) {
                        let tag = this.filteredtagsMultiple[u];
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
    }

    removeDuplicates(num) {
        var x,
            len = num.length,
            out = [],
            obj = {};

        for (x = 0; x < len; x++) {
            obj[num[x]] = 0;
        }
        for (x in obj) {
            if (x != 'undefined')
                out.push(x);
        }
        return out;
    }

    filterTag() {
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

    }
}