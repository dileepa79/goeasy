import {Component, OnInit, Input} from 'angular2/core';
import {NotificationService} from '../services/notifications.service';
import {NgIf} from 'angular2/common';
@Component({
    selector: 'notifications',
    templateUrl: './app/notifications/notifications.component.html',
    styles: [`
    .zippy {
      background-color: #ff0000 !important;
    }
   .zippy2 {
      background-color: #a21318 !important;
    }
  `],
    providers: [
        NotificationService
    ],
})

export class NotificaitonComponent implements OnInit {
    constructor(private _notificationService: NotificationService) { }
    public notificationCount: number;
    errorMessage: string;
    notifications: any[];
    filteredNotificaitons: any[];

    ngOnInit() {
        this.getNotifications();
    }

    getNotifications() {
        this._notificationService.getNotifications()
            .subscribe(_nots => {
                this.filteredNotificaitons = JSON.parse(JSON.stringify(_nots));
                this.notificationCount = _nots.length;
                console.log(this.notifications);
            },
            error => {
                this.errorMessage = <any>error,
                    console.log(this.errorMessage);
            },
            () => () => console.log("Done"));
    }

    snoozeClicked(notification) {
        this._notificationService.updateNotifications(notification.id, true);
    }

    dismissClicked(notification) {
        this._notificationService.updateNotifications(notification.id, false);
    }

    dismissAllClicked() {
        this._notificationService.dismissAll();
    }

}

