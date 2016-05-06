import { Component, OnInit } from 'angular2/core';
import { TagsService } from '../services/tags.service';
import {RouteParams, Router} from 'angular2/router';
import { Tag } from './tags-response';

@Component({
    templateUrl: './app/tags/tag-detail.component.html',
    providers: [
        TagsService
    ]
})

export class TagDetailComponent implements OnInit{
    constructor(
        private _router: Router,
        private _routeParams: RouteParams,
        private _tagsService: TagsService) {
    }

    pageTitle: string = 'Tag Detail';
    tag: Tag
    errorMessage: string;

    ngOnInit() {
        let id = this._routeParams.get('id');

        this._tagsService.getAllTags()
            .subscribe(t => {
                this.tag = t.data.filter(t => t.id === +id)[0];
                console.log(this.errorMessage);
            },
            error => {
                console.log(this.tag);
            },
            () => () => console.log("Done"));
    }
}