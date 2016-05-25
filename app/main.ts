import {bootstrap}    from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import {AppComponent} from './app.component';
import 'rxjs/add/operator/map';
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {TokenService} from './services/token.service'
import {enableProdMode} from '@angular/core'



enableProdMode();
bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    TokenService
]);