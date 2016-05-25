System.register(['@angular/core', './modal-instance'], function(exports_1, context_1) {
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
    var core_1, modal_instance_1;
    var ModalComponent, ModalSize;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (modal_instance_1_1) {
                modal_instance_1 = modal_instance_1_1;
            }],
        execute: function() {
            ModalComponent = (function () {
                function ModalComponent(element) {
                    var _this = this;
                    this.element = element;
                    this.overrideSize = null;
                    this.visible = false;
                    this.animation = true;
                    this.backdrop = true;
                    this.keyboard = true;
                    this.onClose = new core_1.EventEmitter(false);
                    this.onDismiss = new core_1.EventEmitter(false);
                    this.onOpen = new core_1.EventEmitter(false);
                    this.instance = new modal_instance_1.ModalInstance(this.element);
                    this.instance.hidden.subscribe(function (result) {
                        _this.visible = _this.instance.visible;
                        if (result === modal_instance_1.ModalResult.Dismiss)
                            _this.onDismiss.emit(undefined);
                    });
                    this.instance.shown.subscribe(function () {
                        _this.onOpen.emit(undefined);
                    });
                }
                Object.defineProperty(ModalComponent.prototype, "fadeClass", {
                    get: function () { return this.animation; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ModalComponent.prototype, "dataKeyboardAttr", {
                    get: function () { return this.keyboard; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ModalComponent.prototype, "dataBackdropAttr", {
                    get: function () { return this.backdrop; },
                    enumerable: true,
                    configurable: true
                });
                ModalComponent.prototype.ngOnDestroy = function () {
                    return this.instance && this.instance.destroy();
                };
                ModalComponent.prototype.routerCanDeactivate = function () {
                    return this.ngOnDestroy();
                };
                ModalComponent.prototype.open = function (size) {
                    var _this = this;
                    if (ModalSize.validSize(size))
                        this.overrideSize = size;
                    return this.instance.open().then(function () {
                        _this.visible = _this.instance.visible;
                    });
                };
                ModalComponent.prototype.close = function () {
                    var _this = this;
                    return this.instance.close().then(function () {
                        _this.onClose.emit(undefined);
                    });
                };
                ModalComponent.prototype.dismiss = function () {
                    return this.instance.dismiss();
                };
                ModalComponent.prototype.isSmall = function () {
                    return this.overrideSize !== ModalSize.Large
                        && this.size === ModalSize.Small
                        || this.overrideSize === ModalSize.Small;
                };
                ModalComponent.prototype.isLarge = function () {
                    return this.overrideSize !== ModalSize.Small
                        && this.size === ModalSize.Large
                        || this.overrideSize === ModalSize.Large;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], ModalComponent.prototype, "animation", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ModalComponent.prototype, "backdrop", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], ModalComponent.prototype, "keyboard", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ModalComponent.prototype, "size", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ModalComponent.prototype, "onClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ModalComponent.prototype, "onDismiss", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ModalComponent.prototype, "onOpen", void 0);
                __decorate([
                    core_1.HostBinding('class.fade'), 
                    __metadata('design:type', Boolean)
                ], ModalComponent.prototype, "fadeClass", null);
                __decorate([
                    core_1.HostBinding('attr.data-keyboard'), 
                    __metadata('design:type', Boolean)
                ], ModalComponent.prototype, "dataKeyboardAttr", null);
                __decorate([
                    core_1.HostBinding('attr.data-backdrop'), 
                    __metadata('design:type', Object)
                ], ModalComponent.prototype, "dataBackdropAttr", null);
                ModalComponent = __decorate([
                    core_1.Component({
                        selector: 'modal',
                        host: {
                            'class': 'modal',
                            'role': 'dialog',
                            'tabindex': '-1'
                        },
                        template: "\n        <div class=\"modal-dialog\" [ngClass]=\"{ 'modal-sm': isSmall(), 'modal-lg': isLarge() }\">\n            <div class=\"modal-content\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], ModalComponent);
                return ModalComponent;
            }());
            exports_1("ModalComponent", ModalComponent);
            ModalSize = (function () {
                function ModalSize() {
                }
                ModalSize.validSize = function (size) {
                    return size && (size === ModalSize.Small || size === ModalSize.Large);
                };
                ModalSize.Small = 'sm';
                ModalSize.Large = 'lg';
                return ModalSize;
            }());
            exports_1("ModalSize", ModalSize);
        }
    }
});
//# sourceMappingURL=modal.js.map