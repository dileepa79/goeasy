import {Component, Input, OnDestroy} from 'angular2/core';

@Component({
    selector: 'accordion',
    template: `<ng-content></ng-content>`
})
export class Accordion {
    @Input('closeOthers') private onlyOneOpen: boolean;
    private groups: Array<AccordionGroup> = [];

    addGroup(group: AccordionGroup): void { this.groups.push(group); }

    closeOthers(openGroup): void {
        if (!this.onlyOneOpen) {
            return;
        }

        this.groups.forEach((group: AccordionGroup) => {
            if (group !== openGroup) {
                group.isOpen = false;
            }
        });
    }

    removeGroup(group: AccordionGroup): void {
        const index = this.groups.indexOf(group);
        if (index !== -1) {
            this.groups.splice(index, 1);
        }
    }
}

@Component({
    selector: 'accordion-group',
    inputs: ['heading', 'isOpen', 'isDisabled'],
    templateUrl: './app/directive/accordion/accordion.component.html'
})
export class AccordionGroup implements OnDestroy {
    private isDisabled: boolean;
    private _isOpen: boolean = false;

    constructor(private accordion: Accordion) { this.accordion.addGroup(this); }

    toggleOpen(event) {
        event.preventDefault();
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    }

    ngOnDestroy(): void { this.accordion.removeGroup(this); }

    public get isOpen(): boolean { return this._isOpen; }

    public set isOpen(value: boolean) {
        this._isOpen = value;
        if (value) {
            this.accordion.closeOthers(this);
        }
    }
}