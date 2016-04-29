System.register(['angular2/platform/browser', './app.component', 'rxjs/add/operator/map', 'angular2/http', 'rxjs/Rx', './services/token.service', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, app_component_1, http_1, token_service_1, core_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (_1) {},
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_2) {},
            function (token_service_1_1) {
                token_service_1 = token_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            core_1.enableProdMode();
            browser_1.bootstrap(app_component_1.AppComponent, [
                http_1.HTTP_PROVIDERS,
                token_service_1.TokenService
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map