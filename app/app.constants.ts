import {Injectable} from 'angular2/core';

@Injectable()
export class Configuration {
    public Server: string = "http://yaycollaborationapi.azurewebsites.net";
    public ApiUrl: string = "api/";
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}