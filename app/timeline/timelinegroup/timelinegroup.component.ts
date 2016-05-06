import {Component, Input, OnDestroy} from 'angular2/core';

@Component({
    selector: 'timelineinfo',
    template: `<ng-content></ng-content>`
})
export class TimelineInfo {
    @Input('closeOthers') private onlyOneOpen: boolean;
    private groups: Array<TimelineGroup> = [];

    addGroup(group: TimelineGroup): void { this.groups.push(group); }

    closeOthers(openGroup): void {
        if (!this.onlyOneOpen) {
            return;
        }

        this.groups.forEach((group: TimelineGroup) => {
            if (group !== openGroup) {
                group.isOpen = false;
            }
        });
    }

    removeGroup(group: TimelineGroup): void {
        const index = this.groups.indexOf(group);
        if (index !== -1) {
            this.groups.splice(index, 1);
        }
    }
}

@Component({
    selector: 'timeline-group',
    inputs: ['heading', 'isOpen', 'isDisabled', 'availableCountText'],
    templateUrl: './app/timeline/timelinegroup/timelinegroup.component.html'
})
export class TimelineGroup implements OnDestroy {
    private isDisabled: boolean;
    private _isOpen: boolean = false;

    constructor(private timelineInfo: TimelineInfo) { this.timelineInfo.addGroup(this); }

    toggleOpen(event) {
        event.preventDefault();
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    }

    ngOnDestroy(): void { this.timelineInfo.removeGroup(this); }

    public get isOpen(): boolean { return this._isOpen; }

    public set isOpen(value: boolean) {
        this._isOpen = value;
        if (value) {
            this.timelineInfo.closeOthers(this);
        }
    }
}