import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import 'rxjs/add/operator/map';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';
import {TokenService} from './services/token.service'
import {enableProdMode} from 'angular2/core';

enableProdMode();

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    TokenService
]);