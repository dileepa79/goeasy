import {Component, OnInit } from 'angular2/core';
import {AuthService} from '../services/auth.service';
import {UserProfileService} from '../services/user_profile.service';
import {Configuration} from '../app.constants';

@Component({
    selector: 'user-profile',
    styleUrls: ['app/app.component.css'],
    templateUrl: 'app/userprofile/userprofile.component.html'
})


export class UserProfileComponent implements OnInit {
    private webApiUrl: string;
    ngOnInit() {
        setTimeout(() => {
            this.getUserProfile();
        }, 10000);
        //this.getUserProfile();
    }

    constructor(private _authService: AuthService, private _configuration: Configuration) {
        this.webApiUrl = _configuration.ServerWithApiUrl + 'Account/GetUserProfile';
    }
    logout() {
        console.log("logout");
        this._authService.logout();
    }
    getUserProfile() {
        this._authService.get(this.webApiUrl, function (data) {
            console.log(JSON.stringify(data));
        });
    }
}