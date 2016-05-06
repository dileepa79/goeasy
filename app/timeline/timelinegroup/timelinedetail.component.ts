import {Component, Input, OnDestroy} from 'angular2/core';

@Component({
    selector: 'timelinedetail',
    template: `<ng-content></ng-content>`
})
export class TimelineDetail {
    @Input('closeOthers') private onlyOneOpen: boolean;
    private groups: Array<TimelineDetailGroup> = [];

    addGroup(group: TimelineDetailGroup): void { this.groups.push(group); }

    closeOthers(openGroup): void {
        if (!this.onlyOneOpen) {
            return;
        }

        this.groups.forEach((group: TimelineDetailGroup) => {
            if (group !== openGroup) {
                group.isOpen = false;
            }
        });
    }

    removeGroup(group: TimelineDetailGroup): void {
        const index = this.groups.indexOf(group);
        if (index !== -1) {
            this.groups.splice(index, 1);
        }
    }
}

@Component({
    selector: 'timeline-detail-group',
    inputs: ['heading', 'isOpen', 'isDisabled'],
    templateUrl: './app/timeline/timelinegroup/timelinedetail.component.html'
})
export class TimelineDetailGroup implements OnDestroy {
    private isDisabled: boolean;
    private _isOpen: boolean = false;

    constructor(private timelineDetail: TimelineDetail) { this.timelineDetail.addGroup(this); }

    toggleOpen(event) {
        event.preventDefault();
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    }

    ngOnDestroy(): void { this.timelineDetail.removeGroup(this); }

    public get isOpen(): boolean { return this._isOpen; }

    public set isOpen(value: boolean) {
        this._isOpen = value;
        if (value) {
            this.timelineDetail.closeOthers(this);
        }
    }
}