import {Component, OnInit} from 'angular2/core';
import {Router}  from 'angular2/router';
import { TagsService } from '../services/tags.service';
import { Tag } from './tags-response';
import { TagFilterPipe } from './tags-filter.pipe';
import { Collapse } from 'ng2-bootstrap/ng2-bootstrap';
import {Button} from 'primeng/primeng';

@Component({
    selector: 'add-tag',
    templateUrl: './app/tags/tags.component.html',
    pipes: [TagFilterPipe],
    directives: [Collapse, Button],
    providers: [
        TagsService
    ]
})

export class TagsComponent implements OnInit{
    constructor(private _router: Router, private tagsService: TagsService) {
    }

    ngOnInit() {
        this.getTags();
    }

    onClick(tag: Tag) {
        this._router.navigate(['TagDetail', { id: tag.id }]);
    }

    public tagRequest: Tag = {
        id: 0,
        name: '',
        createdBy: '',
        createdDate: ''
    };

    public isCollapsed: boolean = false;
    title = "Tags";
    tags: any[] = [];
    filteredTags: any[] = [];

    filterTag(query, tags: any[]): any[] {
        let filtered: any[] = [];
        for (let i = 0; i < tags.length; i++) {
            let tag = tags[i];
            if (tag.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(tag);
            }
        }
        return filtered;
    }

    searchTags(event) {
        let query = event.query;
        this.filteredTags = this.filterTag(query, this.tags);
    }

    getTags() {
        this.tagsService.getTags().then(tags => {
            this.tags = tags;
            this.filteredTags = JSON.parse(JSON.stringify(tags));
        });
    }

    save() {
        this.tagsService.addTag(this.tagRequest)
            .subscribe(data => {
                console.log("added tag: " + data);
                this.filteredTags.push(data);
            },
            err => console.log("error: " + err),
            () => {
                //this._router.navigate(['TimeLine']);
            }
            );
    }
}