import {Component} from '@angular/core';
import { RecentTimeLineComponent } from '../recenttimeline/recenttimeline.component';
import { ThinkHelpful } from '../thinkhelpful/thinkhelpful.component';
import { WhatIsGoingOnComponent } from '../whatisgoingon/whatisgoingon.component';


@Component({
    selector: 'dashboard',
    templateUrl: './app/dashboard/dashboard.component.html',
    providers: [],
    directives: [RecentTimeLineComponent, ThinkHelpful, WhatIsGoingOnComponent]
})

export class Dashboard {
    constructor() { }
}

