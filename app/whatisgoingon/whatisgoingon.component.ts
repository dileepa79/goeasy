import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {WhatIsGoingOnService} from '../services/whatisgoingon.service';
import {WhatIsGoingOnResponse } from '../whatisgoingon/whatisgoingon-response';

@Component({
    selector: 'whatisgoingon',
    templateUrl: './app/whatisgoingon/whatisgoingon.component.html',
    providers: [WhatIsGoingOnService],
    directives: []
})

export class WhatIsGoingOnComponent implements OnInit {
    constructor(private _whatisgoingonService: WhatIsGoingOnService, public _router: Router) { }

    whatisgoingonTimelines: WhatIsGoingOnResponse[];
    errorMessage: string;
    tags: string = '';
    ngOnInit() {
        this.getWhatisGoingOnActivity();
    }

    getWhatisGoingOnActivity() {
        this._whatisgoingonService.getWhatisGoingOnActivity()
            .subscribe(activity => {
                this.whatisgoingonTimelines = activity;
                console.log(this.whatisgoingonTimelines);
            },
            error => {
                this.errorMessage = <any>error,
                console.log(this.errorMessage);
            },
            () => () => console.log("Done"));
    }

    select(selectedActivityTag: any) {
        for (var i = 0; i < selectedActivityTag.tags.length; i++) {
            this.tags = this.tags + (selectedActivityTag.tags[i].name + (selectedActivityTag.tags.length != i + 1 ? ',' : ''));
        }
        this._router.navigate(['timeline', { tags: this.tags }]);
    }
}

