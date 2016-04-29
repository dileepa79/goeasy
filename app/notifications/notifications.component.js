System.register(['angular2/core', '../services/notifications.service'], function(exports_1, context_1) {
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
    var core_1, notifications_service_1;
    var NotificaitonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (notifications_service_1_1) {
                notifications_service_1 = notifications_service_1_1;
            }],
        execute: function() {
            NotificaitonComponent = (function () {
                function NotificaitonComponent(_notificationService) {
                    this._notificationService = _notificationService;
                }
                NotificaitonComponent.prototype.ngOnInit = function () {
                    this.getNotifications();
                };
                NotificaitonComponent.prototype.getNotifications = function () {
                    var _this = this;
                    this._notificationService.getNotifications()
                        .subscribe(function (_nots) {
                        _this.filteredNotificaitons = JSON.parse(JSON.stringify(_nots));
                        _this.notificationCount = _nots.length;
                        console.log(_this.notifications);
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                    }, function () { return function () { return console.log("Done"); }; });
                };
                NotificaitonComponent = __decorate([
                    core_1.Component({
                        selector: 'notifications',
                        templateUrl: './app/notifications/notifications.component.html',
                        providers: [
                            notifications_service_1.NotificationService
                        ],
                    }), 
                    __metadata('design:paramtypes', [notifications_service_1.NotificationService])
                ], NotificaitonComponent);
                return NotificaitonComponent;
            }());
            exports_1("NotificaitonComponent", NotificaitonComponent);
        }
    }
});
//# sourceMappingURL=notifications.component.js.map