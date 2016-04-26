import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import { TagsResponse } from '../tags/tags-response';
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

    //getTags(): Observable<TagsResponse[]> {
    //    return this.http.get('http://localhost:54736/api/tag')
    //        .map(res => <TagsResponse[]>res.json())
    //        .do(data => console.log(data))
    //        .catch(this.handleError);
    //}

    //private handleError(error: Response) {
    //    console.error(error);
    //    return Observable.throw(error.json().error || 'Server error');
    //}
}