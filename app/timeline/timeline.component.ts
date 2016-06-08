
import {Component, OnInit, Input} from '@angular/core';
import {TimeLineService} from '../services/timeline.service';
import {TimeLineResponse} from './timeline-response';
import {TimeLineRequest} from './timeline-request';
import { TagsResponse, Tag } from '../tags/tags-response';
import { TagsSelectorComponent } from '../tags/tags-selector.component';
import {TimelineInfo, TimelineGroup} from './timelinegroup/timelinegroup.component';
import {TimelineDetail, TimelineDetailGroup} from './timelinegroup/timelinedetail.component';
import {RouteSegment, CanDeactivate} from '@angular/router'
import { Observable } from 'rxjs/Observable';
import {PassTagService} from '../services/passtag.service';
import {InfiniteScroll} from '../timeline/angular2-infinite-scroll'



@Component({
    selector: 'timeline',
    templateUrl: './app/timeline/timeline.component.html',
    providers: [
        TimeLineService
    ],
    directives: [TagsSelectorComponent, TimelineInfo, TimelineGroup, TimelineDetail, TimelineDetailGroup, InfiniteScroll]
})

export class TimeLineComponent implements OnInit, CanDeactivate {
    public oneAtATime: boolean = true;
    tagsStr: string = '';
    tagsResponce: TagsResponse;
    isLoading: boolean = false;
    constructor(private _timeLineService: TimeLineService, routeSegment: RouteSegment, private passTagService: PassTagService) {
        this.tagsStr = routeSegment.getParam('tags');
    }
    selectedTags: any[];
    title = "TIMELINE";
    errorMessage: string;
    timelines: any[];
    filteredTimelines: any[];
    passedTags: Tag[] = [];
    selectedTagStr: string = '';

    public timeLineRequest: TimeLineRequest = {
        data: [],
        isPersistedSearch: false,
        pageNo: 1,
        pageSize: 10
    };

    ngOnInit() {
        if (this.tagsStr != null) {
            var tagsArr = this.tagsStr.split(",");
            for (var i = 0; i < tagsArr.length; i++) {
                var tag: any = tagsArr[i];
                this.passedTags.push(tag);
            }
            this.timeLineRequest.data = this.passedTags;
        }

        this.getTimelines();
    }

    onScroll() {
        // console.log('scrolled!!')
        this.getTimelines();
    }

    routerCanDeactivate(currTree?: any, futureTree?: any) {
        this.timeLineRequest.isPersistedSearch = true;
        this.getTimelines();

        return Observable.of(true).delay(200).toPromise();
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
        this.timeLineRequest.pageNo = 1;
        if (typeof this.filteredTimelines != 'undefined') {
            this.filteredTimelines = new Array();
        }
        this.selectedTagStr = '';

        for (var i = 0; i < this.timeLineRequest.data.length; i++) {
            this.selectedTagStr = this.selectedTagStr + (this.timeLineRequest.data[i] + (this.timeLineRequest.data.length != i + 1 ? ',' : ''));
        }
        this.passTagService.setTags(this.selectedTagStr);

        window.angularComponentRef.zone.run(function () { window.angularComponentRef.component.updateSelectedTags(); });

        this.getTimelines();
    }

    getTimelines() {
        this._timeLineService.getTimeLines(this.timeLineRequest)
            .subscribe(timelines => {
                if (timelines.length <= 0) {
                    return;
                }
                if (this.isLoading) return;
                this.isLoading = true;
                this.timelines = timelines;
                if (typeof this.filteredTimelines == 'undefined') {
                    this.filteredTimelines = new Array();
                }

                for (var x = 0; x < timelines.length; x++) {
                    timelines[x].isLabled = true;
                    this.filteredTimelines.push(timelines[x]);
                }

                for (var y = 0; y < this.filteredTimelines.length; y++) {
                    if (y == this.filteredTimelines.length - 1) { break; }
                    if (this.filteredTimelines[y].dateFormat == this.filteredTimelines[y + 1].dateFormat) {
                        this.filteredTimelines[y + 1].isLabled = false;
                    }
                }

                if (this.timelines.length > 0) {
                    this.timeLineRequest.pageNo = this.timeLineRequest.pageNo + 1;
                    this.isLoading = false;
                }
                else {
                    this.isLoading = true;
                }
                console.log(this.timelines);
                console.log(this.filteredTimelines);

            },
            error => {
                this.errorMessage = <any>error,
                    console.log(this.errorMessage);
                this.isLoading = false;
            },
            () => () => console.log("Done"));
    }
}

