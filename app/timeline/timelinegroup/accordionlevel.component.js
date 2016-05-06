System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var AccordionLevel, AccordionGroupLevel;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AccordionLevel = (function () {
                function AccordionLevel() {
                    this.groups = [];
                }
                AccordionLevel.prototype.addGroup = function (group) { this.groups.push(group); };
                AccordionLevel.prototype.closeOthers = function (openGroup) {
                    if (!this.onlyOneOpen) {
                        return;
                    }
                    this.groups.forEach(function (group) {
                        if (group !== openGroup) {
                            group.isOpen = false;
                        }
                    });
                };
                AccordionLevel.prototype.removeGroup = function (group) {
                    var index = this.groups.indexOf(group);
                    if (index !== -1) {
                        this.groups.splice(index, 1);
                    }
                };
                __decorate([
                    core_1.Input('closeOthers'), 
                    __metadata('design:type', Boolean)
                ], AccordionLevel.prototype, "onlyOneOpen", void 0);
                AccordionLevel = __decorate([
                    core_1.Component({
                        selector: 'accordionlevel',
                        template: "<ng-content></ng-content>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], AccordionLevel);
                return AccordionLevel;
            }());
            exports_1("AccordionLevel", AccordionLevel);
            AccordionGroupLevel = (function () {
                function AccordionGroupLevel(accordionLevel) {
                    this.accordionLevel = accordionLevel;
                    this._isOpen = false;
                    this.accordionLevel.addGroup(this);
                }
                AccordionGroupLevel.prototype.toggleOpen = function (event) {
                    event.preventDefault();
                    if (!this.isDisabled) {
                        this.isOpen = !this.isOpen;
                    }
                };
                AccordionGroupLevel.prototype.ngOnDestroy = function () { this.accordionLevel.removeGroup(this); };
                Object.defineProperty(AccordionGroupLevel.prototype, "isOpen", {
                    get: function () { return this._isOpen; },
                    set: function (value) {
                        this._isOpen = value;
                        if (value) {
                            this.accordionLevel.closeOthers(this);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                AccordionGroupLevel = __decorate([
                    core_1.Component({
                        selector: 'accordion-group-level',
                        inputs: ['heading', 'isOpen', 'isDisabled'],
                        templateUrl: './app/directive/accordion/accordionlevel.component.html'
                    }), 
                    __metadata('design:paramtypes', [AccordionLevel])
                ], AccordionGroupLevel);
                return AccordionGroupLevel;
            }());
            exports_1("AccordionGroupLevel", AccordionGroupLevel);
        }
    }
});
//# sourceMappingURL=accordionlevel.component.js.map