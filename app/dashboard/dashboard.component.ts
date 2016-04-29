import {Component} from 'angular2/core';
import { RecentTimeLineComponent } from '../recenttimeline/recenttimeline.component';
import { ThinkHelpful } from '../thinkhelpful/thinkhelpful.component';
import { WhatIsGoingOn } from '../whatisgoingon/whatisgoingon.component';


@Component({
    selector: 'dashboard',
    templateUrl: './app/dashboard/dashboard.component.html',
    providers: [],
    directives: [RecentTimeLineComponent, ThinkHelpful, WhatIsGoingOn]
})

export class Dashboard {
    constructor() { }
}

