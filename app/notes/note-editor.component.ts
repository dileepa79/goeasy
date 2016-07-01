import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Editor} from 'primeng/primeng';
import { TagsService } from '../services/tags.service';
import { TagsResponse } from '../tags/tags-response';
@Component({
    selector: 'prime-editor',

    template: `
        <p-editor (onTextChange)="OnTextChange($event)" (onSelectionChange)="OnSelectionChange($event)"> 
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
    tagsArray: any[];
    inputValue: string;
    inputHTMLValue: string;
    tags: TagsResponse[] = []

    @Output() tagsAddedEditor: EventEmitter<any> = new EventEmitter<any>();
    @Output() tagsAddedDescription: EventEmitter<string> = new EventEmitter<string>();
    // @Output() tagsRemoved: EventEmitter<TagsResponse[]> = new EventEmitter<TagsResponse[]>();

    ngOnInit() {
        if (typeof this.filteredtagsMultiple == 'undefined') {
            this.filteredtagsMultiple = new Array();
        }
        if (typeof this.tagsArray == 'undefined') {
            this.tagsArray = new Array();
        }

        if (this.filteredtagsMultiple.length == 0) {
            this.tagService.getTags().then(tags => {
                this.filteredtagsMultiple = tags;
            });
        }
    }


    OnTextChange(event) {
        console.log(event.textValue);
        console.log(event.htmlValue);
        console.log(event.delta);
        let query = event.textValue;

        query = query.replace(/(\r\n|\n|\r)/gm, "");
        var splitArray = query.split('/');
        if (splitArray.length == 3) {
            this.tagsArray.push(splitArray[1]);
        }
        var param = splitArray[1];
        this.inputHTMLValue = event.htmlValue;
        this.inputValue = event.textValue + "12";
        // var text1 = event.htmlValue.replace(/(<([^>]+)>)/ig, "").trim();
        // var replaced = text1.search(param) >= 0;
        // if (replaced) {
        //     document.body.innerHTML = text1.replace(param, '*' + param + '*');
        //  } else {
        //param was not replaced   //What to do here?
        //   }


        // this.filtertag(query, this.filteredtagsMultiple);


    }

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