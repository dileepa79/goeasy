import {Component, OnInit, Inject} from 'angular2/core';
import { RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy, Location, HashLocationStrategy } from 'angular2/router';
import {provide} from 'angular2/core';
import {AuthService} from './services/auth.service';
import {AddNoteComponent} from './notes/add-note.component';
import {TimeLineComponent} from './timeline/timeline.component';
import {LoginComponent} from './authentication/login.component';
import {NgIf} from 'angular2/common';
import {Configuration} from './app.constants';
import {TagsComponent} from './tags/tags.component';
import {UserProfileComponent} from './userprofile/userprofile.component';
import {RecentTimeLineComponent} from './recenttimeline/recenttimeline.component';
import {Dashboard} from './dashboard/dashboard.component';
import {NotificaitonComponent} from './notifications/notifications.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {FeedbackService} from './services/feedback.service';



@Component({
    selector: 'my-app',
    styleUrls: ['app/app.component.css'],
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES, UserProfileComponent, NotificaitonComponent, FeedbackComponent],
    providers: [
        ROUTER_PROVIDERS,
        provide(LocationStrategy, { useClass: HashLocationStrategy }),
        AuthService,
        LoginComponent,
        AddNoteComponent,
        Configuration,
        FeedbackService

    ]
})

@RouteConfig(
    [
        {
            path: '/login',
            name: 'Login',
            component: LoginComponent,
            useAsDefault: true
        },
        //{
        //    path: 'signup',
        //    name: 'Signup',
        //    component: AuthService
        //},
        {
            path: '/addnote',
            name: 'AddNote',
            component: AddNoteComponent
        },
        {
            path: '/timeline',
            name: 'TimeLine',
            component: TimeLineComponent
        },
        {
            path: '/tags',
            name: 'Tags',
            component: TagsComponent
        },
        {
            path: '/recenttimeline',
            name: 'RecentTimeline',
            component: RecentTimeLineComponent
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        }

    ]
)

export class AppComponent implements OnInit {

    isAuthorized: boolean = false;
    ngOnInit() {
        if (this.isAuthorized)
            this._router.navigate(['Dashboard']);
        else
            this._router.navigate(['Login']);
    }

    constructor(private _router: Router) {
    }
}
