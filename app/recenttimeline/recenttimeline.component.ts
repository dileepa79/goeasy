import {Component, OnInit, ViewChild} from '@angular/core';
import {RecentTimeLineService} from '../services/recenttimeline.service';
import {TimeLineWatchService} from '../services/timeline-watch.service';
import { TimeLineComponent } from '../timeline/timeline.component';
import { ShareTimelineComponent } from '../sharetimeline/sharetimeline.component';
import { RecentTimeLineResponse } from '../recenttimeline/recenttimeline-response';
import { Router} from '@angular/router';
import { UsersSelectorComponent } from '../noteshareusers/users-selector.component';
import { MODAL_DIRECTIVES, ModalComponent } from '../modal/modaldialog';
import { TimeLineWatch } from '../shared/timeline-watch';
import {CSSCarouselComponent} from '../carousel/carousel.component';
import {RecentTimelineWatchFilter} from '../recenttimeline/recenttimeline.watchfilter.component';

@Component({
    selector: 'recentimeline',
    pipes: [RecentTimelineWatchFilter],
    templateUrl: './app/recenttimeline/recenttimeline.component.html',
    //css
    styles: ['.wrapper{width: 1%;margin: 2px auto;}'],
    providers: [
        RecentTimeLineService, TimeLineWatchService
    ],
    directives: [TimeLineComponent, MODAL_DIRECTIVES, ShareTimelineComponent, UsersSelectorComponent, CSSCarouselComponent]
})

export class RecentTimeLineComponent implements OnInit {
   // @ViewChild('parentModal')
    //parentModal: ModalComponent;

    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;
    currentTimeline_id: string;
    users: any[] = [];
    isWatchedFilter: boolean = false;

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

    watchFilter(rtl) {
        this.isWatchedFilter = !rtl;
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
            isStatusUpdate: false,
            timeLineId: selectedTimeline.id
        };

        timeLineWatch.isWatched = selectedTimeline.isWatched;
        timeLineWatch.isStatusUpdate = true;
        timeLineWatch.tags = selectedTimeline.tags.map(function (d) { return d['name']; })

        this.updateTimelineWatch(timeLineWatch, selectedTimeline);
    }

    setCurrentTimeline(_selectedTimeline: any) {
        this.currentTimeline_id = _selectedTimeline.id;
    }

    onSelectedUsersChanged(_users: any[]): void {
        this.users = _users.map(function (d) { return d['userName']; });
    }

    shareTimeline() {

        var timeline_share = {
            TimeLineId: this.currentTimeline_id,
            AppUsers: this.users
        };

        this._timeLineService.share(timeline_share);
    }
}

