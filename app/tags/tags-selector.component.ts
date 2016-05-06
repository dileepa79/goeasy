import { Component, Output, Input, OnInit, EventEmitter } from 'angular2/core';
import {AutoComplete} from 'primeng/primeng';
import { TagsService } from '../services/tags.service';
import { TagsResponse } from './tags-response';

@Component({
    selector: 'prime-app',

    template: `
        <p-autoComplete [(ngModel)]="tags" [suggestions]="filteredtagsMultiple" (completeMethod)="filtertagMultiple($event)" style="width:100%"
            [minLength]="1" placeholder="Select Tags" field="name" [multiple]="true" [allowNewInput] = "isAllowedNewInput" [inputValues] = "inputValues" (onSelect)="handleSelectTag($event)" (onUnselect)="handleUnSelectTag($event)">
        </p-autoComplete>
    `,
    directives: [AutoComplete],
    providers: [TagsService]
})

export class TagsSelectorComponent{

    @Output() tagsAdded: EventEmitter<TagsResponse[]> = new EventEmitter<TagsResponse[]>();
    @Output() tagsRemoved: EventEmitter<TagsResponse[]> = new EventEmitter<TagsResponse[]>();

    filteredtagsMultiple: any[];
    @Input() isAllowedNewInput: boolean;
    @Input() inputValues: any[];
    errorMessage: string;
    tags: TagsResponse[] = []
    constructor(private tagService: TagsService) { }

    filtertagMultiple(event) {
        let query = event.query;
        this.tagService.getTags().then(tags => {
            this.filteredtagsMultiple = this.filtertag(query, tags);
        });
    }

    filtertag(query, tags: any[]): any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        for (let i = 0; i < tags.length; i++) {
            let tag = tags[i];
            if (tag.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(tag);
            }
        }
        return filtered;
    }

    handleSelectTag() {
        this.tagsAdded.emit(this.tags);
    }

    handleUnSelectTag() {
        this.tagsRemoved.emit(this.tags);
    }
}