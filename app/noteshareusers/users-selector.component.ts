import { Component, Output, Input, OnInit, EventEmitter } from 'angular2/core';
import {AutoComplete} from 'primeng/primeng';
import { UsersService } from '../services/users.service';
import { UsersResponse } from './users-response';

@Component({
    selector: 'user-app',

    template: `
        <p-autoComplete [(ngModel)]="users" [suggestions]="filteredusersMultiple" (completeMethod)="filteruserMultiple($event)" style="width:100%"
            [minLength]="1" placeholder="Select Users" field="userName" [multiple]="true" [allowNewInput] = "isAllowedNewInput" (onSelect)="handleSelectUser($event)" (onUnselect)="handleUnSelectUser($event)">
        </p-autoComplete>
    `,
    directives: [AutoComplete],
    providers: [UsersService]
})

export class UsersSelectorComponent {

    @Output() usersAdded: EventEmitter<UsersResponse[]> = new EventEmitter<UsersResponse[]>();
    @Output() usersRemoved: EventEmitter<UsersResponse[]> = new EventEmitter<UsersResponse[]>();

    filteredusersMultiple: any[];
    @Input() isAllowedNewInput: boolean;
    errorMessage: string;
    users: UsersResponse[] = []
    constructor(private userService: UsersService) { }

    filteruserMultiple(event) {
        let query = event.query;
        this.userService.getUsers().then(users => {
            this.filteredusersMultiple = this.filteruser(query, users);
        });
    }

    filteruser(query, users: any[]): any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.userName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(user);
            }
        }
        return filtered;
    }

    handleSelectUser() {
        this.usersAdded.emit(this.users);
    }

    handleUnSelectUser() {
        this.usersRemoved.emit(this.users);
    }
}