import {Injectable} from '@angular/core';

@Injectable()
export class Configuration {
    //public Server: string = "http://yaycollaborationapi.azurewebsites.net/";
    //public Server: string = "http://localhost:54736/";
	public Server: string = "http://yayprod.azurewebsites.net/";
    public ApiUrl: string = "api/";
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}