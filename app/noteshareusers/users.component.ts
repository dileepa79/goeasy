import {Component, OnInit} from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from './users-response';
import { CollapseDirective  } from '../directives/collapse.directive';

@Component({
    selector: 'add-user',
    templateUrl: './app/users/users.component.html',
    directives: [CollapseDirective],
    providers: [
        UsersService
    ]
})

export class UsersComponent implements OnInit {
    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.getUsers();
    }

    public userRequest: User = {
        userName: '',
        userId: ''
    };

    public isCollapsed: boolean = false;
    title = "Users";
    users: any[] = [];
    filteredUsers: any[] = [];

    filterUser(query, users: any[]): any[] {
        let filtered: any[] = [];
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.userName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(user);
            }
        }

        return filtered;
    }

    searchUsers(event) {
        let query = event.query;
        this.filteredUsers = this.filterUser(query, this.users);
    }

    getUsers() {
        this.usersService.getUsers().then(users => {
            this.users = users;
            this.filteredUsers = JSON.parse(JSON.stringify(users));
        });
    }

    onSelectedUsersChanged(users: any[]): void {

        //this.users = users.map(function (d) { return d['userName']; });
    }
    /*
    shareNote() {
        this.notesService.shareNote(this.userRequest).subscribe(data => {
                console.log("shared Note: " + data);
                this.filteredUsers.push(data);
            }, err => console.log("error: " + err),
            () => {})
    }
    */

    /*
    save() {
        this.usersService.addTag(this.userRequest)
            .subscribe(data => {
                console.log("added tag: " + data);
                this.filteredUser.push(data);
            },
            err => console.log("error: " + err),
            () => {
                //this._router.navigate(['timeline']);
            }
            );
    }*/
}