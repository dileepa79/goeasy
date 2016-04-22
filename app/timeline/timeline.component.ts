import {Component, OnInit} from 'angular2/core';
import {TimeLineService} from '../services/timeline.service';
import {TimeLineResponse} from './timeline-response';

@Component({
    selector: 'timeline',
    templateUrl: './app/timeline/timeline.component.html',
    providers: [
        TimeLineService
    ]
})

export class TimeLineComponent implements OnInit {
    constructor(private _timeLineService: TimeLineService) {}

    title = "TIMELINE";
    errorMessage: string;
    timelines: TimeLineResponse[] = [];

    ngOnInit() {
        this.getTimelines();
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
                    console.log(this.timelines);
                },
                error => {
                    this.errorMessage = <any>error,
                        console.log(this.errorMessage);
                },
                () => () => console.log("Done"));
    }
}

