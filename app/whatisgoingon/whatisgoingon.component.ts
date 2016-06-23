import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {WhatIsGoingOnService} from '../services/whatisgoingon.service';
import {WhatIsGoingOnResponse } from '../whatisgoingon/whatisgoingon-response';
import {WhatIsGoingOnRequest } from '../whatisgoingon/whatisgoingon-request';
import {InfiniteScroll} from '../timeline/angular2-infinite-scroll';

@Component({
    selector: 'whatisgoingon',
    templateUrl: './app/whatisgoingon/whatisgoingon.component.html',
    providers: [WhatIsGoingOnService],
    directives: [InfiniteScroll]
})

export class WhatIsGoingOnComponent implements OnInit {
    constructor(private _whatisgoingonService: WhatIsGoingOnService, public _router: Router) { }

    whatisgoingonTimelines: WhatIsGoingOnResponse[];
    timelineActivity: WhatIsGoingOnResponse[];
    isLoading: boolean = false;
   
    public whatIsGoingOnRequest: WhatIsGoingOnRequest = {
        pageNo: 1,
        pageSize: 10
    };

    errorMessage: string;
    tags: string = '';
    totalPages: number = 0;
    
    ngOnInit() {
        this.getWhatisGoingOnActivity();
    }

    onScroll() {
        if (this.whatIsGoingOnRequest.pageNo > 1)
            this.getWhatisGoingOnActivity();
    }

    getWhatisGoingOnActivity() {
        if (this.isLoading) return;
        this.isLoading = true;
        this._whatisgoingonService.getWhatisGoingOnActivity(this.whatIsGoingOnRequest)
            .subscribe(activity => {
                    this.timelineActivity = activity;

                    if (typeof this.whatisgoingonTimelines == 'undefined') {
                        this.whatisgoingonTimelines = new Array();
                    }
                    console.log(this.timelineActivity);

                    for (var x = 0; x < this.timelineActivity.length; x++) {
                        this.totalPages = this.timelineActivity[x].totalPages;
                        this.whatisgoingonTimelines.push(this.timelineActivity[x]);
                    }
                    console.log(this.whatisgoingonTimelines);
                   
                    if (this.whatIsGoingOnRequest.pageNo < this.totalPages) {
                        this.whatIsGoingOnRequest.pageNo = this.whatIsGoingOnRequest.pageNo + 1;
                        this.isLoading = false;
                    }
                },
                error => {
                    this.errorMessage = <any>error,
                        console.log(this.errorMessage);
                    this.isLoading = false;
                },
                () => () => {
                    console.log("Done");
                    this.isLoading = false;
                });

    }

    select(selectedActivityTag: any) {
        for (var i = 0; i < selectedActivityTag.tags.length; i++) {
            this.tags = this.tags + (selectedActivityTag.tags[i].name + (selectedActivityTag.tags.length != i + 1 ? ',' : ''));
        }
        this._router.navigate(['timeline', { tags: this.tags }]);
    }
}

