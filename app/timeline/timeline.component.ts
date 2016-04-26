import {Component, OnInit, Input} from 'angular2/core';
import {TimeLineService} from '../services/timeline.service';
import {TimeLineResponse} from './timeline-response';
import { TagsResponse } from '../tags/tags-response';
import { TagsSelectorComponent } from '../tags/tags-selector.component';

@Component({
    selector: 'timeline',
    templateUrl: './app/timeline/timeline.component.html',
    providers: [
        TimeLineService
    ],
    directives: [TagsSelectorComponent]
})

export class TimeLineComponent implements OnInit {
    constructor(private _timeLineService: TimeLineService) { }
    selectedTags: any[]
    title = "TIMELINE";
    errorMessage: string;
    timelines: any[];
    filteredTimelines: any[];

    ngOnInit() {
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

    //getTimelines() {
    //    this._timeLineService.getTimeLines()
    //        .subscribe(tl => {
    //                //this.timelines = timelines;
    //                tl.forEach((tt) => {
    //                    this.timelines.push(
    //                        //new TimeLineResponse(
    //                        //    tt.Title,
    //                        //    tt.Description,
    //                        //    new Date(tt.CreateDate)
    //                        //));
    //                        new TimeLineResponse(
    //                            tt.Title,
    //                            tt.Description
    //                        ));
    //                });
    //                console.log(this.timelines);
    //            },
    //            error => {
    //                this.errorMessage = <any>error,
    //                    console.log(this.errorMessage);
    //            },
    //            () => () => console.log("Done"));
    //}

    getTimelines() {
        this._timeLineService.getTimeLines()
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

