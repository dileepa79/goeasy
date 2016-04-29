import {Component, Input, OnDestroy} from 'angular2/core';

@Component({
    selector: 'accordionlevel',
    template: `<ng-content></ng-content>`
})
export class AccordionLevel {
    @Input('closeOthers') private onlyOneOpen: boolean;
    private groups: Array<AccordionGroupLevel> = [];

    addGroup(group: AccordionGroupLevel): void { this.groups.push(group); }

    closeOthers(openGroup): void {
        if (!this.onlyOneOpen) {
            return;
        }

        this.groups.forEach((group: AccordionGroupLevel) => {
            if (group !== openGroup) {
                group.isOpen = false;
            }
        });
    }

    removeGroup(group: AccordionGroupLevel): void {
        const index = this.groups.indexOf(group);
        if (index !== -1) {
            this.groups.splice(index, 1);
        }
    }
}

@Component({
    selector: 'accordion-group-level',
    inputs: ['heading', 'isOpen', 'isDisabled'],
    templateUrl: './app/directive/accordion/accordionlevel.component.html'
})
export class AccordionGroupLevel implements OnDestroy {
    private isDisabled: boolean;
    private _isOpen: boolean = false;

    constructor(private accordionLevel: AccordionLevel) { this.accordionLevel.addGroup(this); }

    toggleOpen(event) {
        event.preventDefault();
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    }

    ngOnDestroy(): void { this.accordionLevel.removeGroup(this); }

    public get isOpen(): boolean { return this._isOpen; }

    public set isOpen(value: boolean) {
        this._isOpen = value;
        if (value) {
            this.accordionLevel.closeOthers(this);
        }
    }
}