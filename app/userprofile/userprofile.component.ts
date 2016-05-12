import {Component, OnInit } from 'angular2/core';
import {AuthService} from '../services/auth.service';
import {UserProfileService} from '../services/user_profile.service';
import {Configuration} from '../app.constants';

export class UserProfileData {
    email: string;
    name: string;
    profileImageId: string;
}

@Component({
    selector: 'user-profile',
    styleUrls: ['app/app.component.css'],
    templateUrl: 'app/userprofile/userprofile.component.html',
    providers: [
        UserProfileService
    ]
})


export class UserProfileComponent implements OnInit {
    ngOnInit() {
        setTimeout(() => {
            this.getUserProfile();
        }, 10000);
        //this.getUserProfile();
    }

    constructor(private _authService: AuthService, private _configuration: Configuration, private _userProfileService: UserProfileService) {
      
    }
  
    errorMessage: string;
    imageURL: String;

    public userProfileData: UserProfileData = {
        email: '',
        name: '',
        profileImageId: ''
    };

    logout() {
        console.log("logout");
        this._authService.logout();
    }
    getUserProfile() {
        //this._authService.get(this.webApiUrl, function (data) {
        //    console.log(JSON.stringify(data));
        //});
        this._userProfileService.getUserProfile()
            .subscribe(data => {
                this.userProfileData = JSON.parse(JSON.stringify(data));
                this.getUserImage(this.userProfileData.profileImageId != null ? this.userProfileData.profileImageId : '');
                },
            error => {
                this.errorMessage = <any>error,
                console.log(this.errorMessage);
            },
            () => () => console.log("Done"));
    }

    getUserImage(externalReference) {
        this._userProfileService.getImage(externalReference)
            .subscribe(data => {
                this.imageURL = JSON.parse(JSON.stringify(data));
            },
            error => {
                this.errorMessage = <any>error,
                console.log(this.errorMessage);
            },
            () => () => console.log("Done"));
    }
}