import {Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {TimeLineService} from '../services/timeline.service';
import {TimeLineResponse} from './timeline-response';
import {TimeLineRequest} from './timeline-request';
import { TagsResponse, Tag } from '../tags/tags-response';
import { TagsSelectorComponent } from '../tags/tags-selector.component';
import {Accordion, AccordionGroup} from '../directive/accordion/accordion.component';
import {AccordionLevel, AccordionGroupLevel} from '../directive/accordion/accordionlevel.component';
import {RouteParams} from 'angular2/router'


@Component({
    selector: 'timeline',
    templateUrl: './app/timeline/timeline.component.html',
    providers: [
        TimeLineService
    ],
    directives: [TagsSelectorComponent, Accordion, AccordionGroup, AccordionLevel, AccordionGroupLevel]
})

export class TimeLineComponent implements OnInit, OnDestroy {
    public oneAtATime: boolean = true;
    tagsStr: string
    tagsResponce: TagsResponse;
    constructor(private _timeLineService: TimeLineService, params: RouteParams)
    {
        this.tagsStr = params.get('tags');
    }
    selectedTags: any[]
    title = "TIMELINE";
    errorMessage: string;
    timelines: any[];
    filteredTimelines: any[];
    passedTags: Tag[] = [];
      
    public timeLineRequest: TimeLineRequest = {
        data: [],
        isPersistedSearch: false
    };    


    ngOnInit() {
        if (this.tagsStr != null) {
            var tagsArr = this.tagsStr.split(",");
            for (var i = 0; i < tagsArr.length; i++) {
                var tag: any = tagsArr[i] ;
                this.passedTags.push(tag);
            }  
            this.timeLineRequest.data = this.passedTags;
        }  
        
        this.getTimelines();
    }

    ngOnDestroy() {
        this.timeLineRequest.isPersistedSearch = true;
        this.getTimelines();
    }

    onSelectedTagsAdded(tags: any[]): void {
        this.selectedTags = tags;
        if (this.selectedTags.length != 0) {
            var selected = this.selectedTags;
            
            this.filteredTimelines.forEach((tl) => {
                var itemIndexesToDelete = [];
                tl.items.forEach((item) => {
                    var selectedArr = selected.map(function (d) { return d['name']; })
                    var itemsArr = item.tags.map(function (d) { return d['name']; })
                    
                    var isExists = selectedArr.every(i => itemsArr.indexOf(i) !== -1);

                    if (!isExists) {
                        var index = tl.items.indexOf(item);
                        if (index > -1) {
                            itemIndexesToDelete.push(index);
                        }
                    }
                  }
                )
                for (var i = itemIndexesToDelete.length - 1; i >= 0; i--)
                    tl.items.splice(itemIndexesToDelete[i], 1);

                console.log(this.filteredTimelines);
            }

            )
        }
        else {
            this.filteredTimelines = JSON.parse(JSON.stringify(this.timelines));
        }
    }

    onSelectedTagsRemoved(tags: any[]): void {
        this.selectedTags = tags;
        if (this.selectedTags.length != 0) {
            this.filteredTimelines = JSON.parse(JSON.stringify(this.timelines));
            var selected = this.selectedTags;
            
            this.filteredTimelines.forEach((tl) => {
                var itemIndexesToDelete = [];
                tl.items.forEach((item) => {
                    var selectedArr = selected.map(function (d) { return d['name']; })
                    var itemsArr = item.tags.map(function (d) { return d['name']; })

                    var isExists = selectedArr.every(i => itemsArr.indexOf(i) !== -1);

                    if (!isExists) {
                        var index = tl.items.indexOf(item);
                        if (index > -1) {
                            itemIndexesToDelete.push(index);
                        }
                    }
                }
                )

                for (var i = itemIndexesToDelete.length - 1; i >= 0; i--)
                    tl.items.splice(itemIndexesToDelete[i], 1);
                console.log(this.filteredTimelines);
            }
            )
        }
        else {
            this.filteredTimelines = JSON.parse(JSON.stringify(this.timelines));
        }
    }

    onSelectedTagsChanged(tags: any[]): void {
        this.timeLineRequest.data = tags.map(function (d) { return d['name']; });
        this.timeLineRequest.isPersistedSearch = false;
        this.getTimelines();
    }

    getTimelines() {
        this._timeLineService.getTimeLines(this.timeLineRequest)
            .subscribe(timelines => {
                this.timelines = timelines;
                this.filteredTimelines = JSON.parse(JSON.stringify(timelines));
                console.log(this.timelines);
            },
            error => {
                this.errorMessage = <any>error,
                    console.log(this.errorMessage);
            },
            () => () => console.log("Done"));
    }
}

