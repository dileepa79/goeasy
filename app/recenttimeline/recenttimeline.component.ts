import {Component, OnInit, Input, Output, EventEmitter} from 'angular2/core';
import {RecentTimeLineService} from '../services/recenttimeline.service';
import { TimeLineComponent } from '../timeline/timeline.component';
import { Router} from 'angular2/router';

@Component({
    selector: 'recentimeline',
    templateUrl: './app/recenttimeline/recenttimeline.component.html',
    providers: [
        RecentTimeLineService
    ],
    directives: [TimeLineComponent]
})

export class RecentTimeLineComponent implements OnInit {
    constructor(private _timeLineService: RecentTimeLineService, public _router: Router) { }
    title = "RECENT TIMELINE";
    errorMessage: string;
    recenttimelines: any[];
    tags: string = '';

    ngOnInit() {
        this.getRecentTimelines();
    }


    getRecentTimelines() {
        this._timeLineService.getRecentTimeLines()
            .subscribe(timelines => {
                this.recenttimelines = timelines;
                console.log(this.recenttimelines);
            },
            error => {
                this.errorMessage = <any>error,
                    console.log(this.errorMessage);
            },
            () => () => console.log("Done"));
    }

    select(selectedTimeline: any) {
        for (var i = 0; i < selectedTimeline.tags.length; i++) {
            this.tags = this.tags + (selectedTimeline.tags[i].name + (selectedTimeline.tags.length != i + 1 ? ',' : ''));
        }        
        this._router.navigate(['TimeLine', { tags: this.tags }]);
    }
}

