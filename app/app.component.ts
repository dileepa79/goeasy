import {Component, OnInit, Inject} from 'angular2/core';
import { RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {AuthService} from './services/auth.service';
import {AddNoteComponent} from './notes/add-note.component';
import {TimeLineComponent} from './timeline/timeline.component';
import {LoginComponent} from './authentication/login.component';
import {NgIf} from 'angular2/common';
import {Configuration} from './app.constants';

@Component({
    selector: 'my-app',
    styleUrls: ['app/app.component.css'],
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        AuthService,
        LoginComponent,
        AddNoteComponent,
        Configuration        
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
        }
    ]
)

export class AppComponent implements OnInit {

    isAuthorized: boolean = false;
    ngOnInit() {
        if (this.isAuthorized)
            this._router.navigate(['TimeLine']);
        else
            this._router.navigate(['Login']);
    }

    constructor(private _router: Router) {
    }
}
