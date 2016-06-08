System.register(['@angular/core'], function(exports_1, context_1) {
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
    var CSSCarouselComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            // Compoent Decorator
            CSSCarouselComponent = (function () {
                function CSSCarouselComponent() {
                    //images data to be bound to the template
                    this.images = [];
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], CSSCarouselComponent.prototype, "images", void 0);
                CSSCarouselComponent = __decorate([
                    core_1.Component({
                        //Name of our tag
                        selector: 'css-carousel',
                        //Template for the tag
                        templateUrl: './app/carousel/carousel.html',
                        //Styles for the tag
                        styleUrls: ['./css/img.css'],
                    }), 
                    __metadata('design:paramtypes', [])
                ], CSSCarouselComponent);
                return CSSCarouselComponent;
            }());
            exports_1("CSSCarouselComponent", CSSCarouselComponent);
        }
    }
});
//# sourceMappingURL=carousel.component.js.map