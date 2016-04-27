import { Injectable } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import { TagsResponse, Tag } from '../tags/tags-response';
import {Configuration} from '../app.constants';

@Injectable()
export class TagsService {
    private webApiUrl: string;
    constructor(private http: Http, private _configuration: Configuration) {
        this.webApiUrl = _configuration.ServerWithApiUrl + 'tag';
    }

    getTags() {
        return this.http.get(this.webApiUrl)
            .toPromise()
            .then(res => <any>res.json().data)
            .then(data => { return data; });
    }

    public addTag(tagRequest): Observable<Tag> {
        console.log("Tag: " + tagRequest);

        var body = JSON.stringify(tagRequest);
        var headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        var options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:54736/api/tag', body, options)
            .map(res => {
                // If request fails, throw an Error that will be caught
                if (res.status < 200 || res.status >= 300) {
                    throw new Error('This request has failed ' + res.status);
                } 
                // If everything went fine, return the response
                else {
                    return <Tag>res.json();
                }
            })
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}