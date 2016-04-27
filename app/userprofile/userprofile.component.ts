import {Component, OnInit } from 'angular2/core';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'user-profile',
    styleUrls: ['app/app.component.css'],
    templateUrl: 'app/userprofile/userprofile.component.html'
})


export class UserProfileComponent implements OnInit {
    ngOnInit() {
    }

    constructor(private _authService : AuthService) {
    }
    logout() {
        console.log("logout");
        this._authService.logout();
    }
}