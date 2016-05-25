System.register(['@angular/core', '../services/auth.service', '../services/user_profile.service', '../app.constants'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, auth_service_1, user_profile_service_1, app_constants_1;
    var UserProfileData, UserProfileComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (user_profile_service_1_1) {
                user_profile_service_1 = user_profile_service_1_1;
            },
            function (app_constants_1_1) {
                app_constants_1 = app_constants_1_1;
            }],
        execute: function() {
            UserProfileData = (function () {
                function UserProfileData() {
                }
                return UserProfileData;
            }());
            exports_1("UserProfileData", UserProfileData);
            UserProfileComponent = (function () {
                function UserProfileComponent(_authService, _configuration, _userProfileService) {
                    this._authService = _authService;
                    this._configuration = _configuration;
                    this._userProfileService = _userProfileService;
                    this.userProfileData = {
                        email: '',
                        name: '',
                        profileImageId: ''
                    };
                }
                UserProfileComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    setTimeout(function () {
                        _this.getUserProfile();
                    }, 10000);
                    //this.getUserProfile();
                };
                UserProfileComponent.prototype.logout = function () {
                    console.log("logout");
                    this._authService.logout();
                };
                UserProfileComponent.prototype.getUserProfile = function () {
                    var _this = this;
                    //this._authService.get(this.webApiUrl, function (data) {
                    //    console.log(JSON.stringify(data));
                    //});
                    this._userProfileService.getUserProfile()
                        .subscribe(function (data) {
                        _this.userProfileData = JSON.parse(JSON.stringify(data));
                        _this.getUserImage(_this.userProfileData.profileImageId != null ? _this.userProfileData.profileImageId : '');
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                    }, function () { return function () { return console.log("Done"); }; });
                };
                UserProfileComponent.prototype.getUserImage = function (externalReference) {
                    var _this = this;
                    this._userProfileService.getImage(externalReference)
                        .subscribe(function (data) {
                        _this.imageURL = JSON.parse(JSON.stringify(data));
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                    }, function () { return function () { return console.log("Done"); }; });
                };
                UserProfileComponent = __decorate([
                    core_1.Component({
                        selector: 'user-profile',
                        styleUrls: ['app/app.component.css'],
                        templateUrl: 'app/userprofile/userprofile.component.html',
                        providers: [
                            user_profile_service_1.UserProfileService
                        ]
                    }), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService, app_constants_1.Configuration, user_profile_service_1.UserProfileService])
                ], UserProfileComponent);
                return UserProfileComponent;
            }());
            exports_1("UserProfileComponent", UserProfileComponent);
        }
    }
});
//# sourceMappingURL=userprofile.component.js.map