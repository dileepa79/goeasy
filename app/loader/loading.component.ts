import {Component, Injectable, NgZone} from '@angular/core';

@Component({
    selector: 'loading',
    templateUrl: 'app/loader/loading.component.html'
})
export class LoadingComponent {
    showLoading: boolean = false;
    constructor(private zone: NgZone) {
    window.loadingComponentRef = {
        zone: this.zone,
        component: this
    }; }
    show() { this.showLoading = true; }
    hide() { this.showLoading = false; }
}