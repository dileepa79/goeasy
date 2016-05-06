import {Component, OnInit, ViewChild} from 'angular2/core';
import {RecentTimeLineService} from '../services/recenttimeline.service';
import {TimeLineWatchService} from '../services/timeline-watch.service';
import { TimeLineComponent } from '../timeline/timeline.component';
import { ShareTimelineComponent } from '../sharetimeline/sharetimeline.component';
import { RecentTimeLineResponse } from '../recenttimeline/recenttimeline-response';
import { Router} from 'angular2/router';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { TimeLineWatch } from '../shared/timeline-watch';

@Component({
    selector: 'recentimeline',
    templateUrl: './app/recenttimeline/recenttimeline.component.html',
    providers: [
        RecentTimeLineService, TimeLineWatchService
    ],
    directives: [TimeLineComponent, MODAL_DIRECTIVES, ShareTimelineComponent]
})

export class RecentTimeLineComponent implements OnInit {
   

   // @ViewChild('parentModal')
    //parentModal: ModalComponent;

    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;

    constructor(private _timeLineService: RecentTimeLineService, private _timeLineWatchService: TimeLineWatchService, public _router: Router) { }
    title = "RECENT TIMELINE";
    errorMessage: string;
    recentTimelines: RecentTimeLineResponse[];
    selectedTimeline: RecentTimeLineResponse;

    timeLineWatch: any = {
        tags: [],
        isWatched: false,
        isStatusUpdate: false
    };    

    tags: string = '';
    isWatched: boolean;

    ngOnInit() {
        this.getRecentTimelines();
    }


    getRecentTimelines() {
        this._timeLineService.getRecentTimeLines()
            .subscribe(timelines => {
                this.recentTimelines = timelines;
                console.log(this.recentTimelines);
            },
            error => {
                this.errorMessage = <any>error,
                    console.log(this.errorMessage);
            },
            () => () => console.log("Done"));
    }

    updateTimelineWatch(timeLineWatch: TimeLineWatch, selectedTimeline: RecentTimeLineResponse) {
        this._timeLineWatchService.updateTimelineWatch(timeLineWatch)
            .subscribe(watch => {
                this.timeLineWatch = watch;
                var selected = this.recentTimelines.filter(function (obj) {
                    return obj.id == selectedTimeline.id;
                });

                selected[0].isWatched = this.timeLineWatch.isWatched;
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

    openModal(timeline: RecentTimeLineResponse) {
        this.selectedTimeline = timeline;
        //this.parentModal.open()
    }
    watch(selectedTimeline: any) {

        var timeLineWatch: TimeLineWatch = {
            tags: [],
            isWatched: false,
            isStatusUpdate: false
        };

        timeLineWatch.isWatched = selectedTimeline.isWatched;
        timeLineWatch.isStatusUpdate = true;
        timeLineWatch.tags = selectedTimeline.tags.map(function (d) { return d['name']; })

        this.updateTimelineWatch(timeLineWatch, selectedTimeline);
    }
}

