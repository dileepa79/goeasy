import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Configuration} from '../app.constants';
import {AuthService} from './auth.service';

@Injectable()
export class NotesService {
    private webApiUrl: string;
    tags: string = '';
    constructor(private _router: Router, private http: Http, private _configuration: Configuration, private _authService: AuthService) {
        this.webApiUrl = _configuration.ServerWithApiUrl + 'Note';
    }

    //public addNote(noteRequest) {
    //    console.log("Title: " + noteRequest.title + ", description: " + noteRequest.description);

    //    var headers = new Headers();
    //    headers.append('Content-Type', 'application/json');
    //    this.http.post('http://localhost:54736/api/Note',
    //        JSON.stringify(noteRequest),
    //        { headers: headers })
    //        .map((res: Response) => res.json())
    //        .subscribe((res: noteRequest) => this.postResponse = res);
    //}

    public addNote(noteRequest) {
        console.log("Title: " + noteRequest.title + ", description: " + noteRequest.description);

        var body = JSON.stringify(noteRequest);
        //var headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        var headers = this._authService.getHeader();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        return this.http.post(this.webApiUrl + '/AddNote', body, options)
            .map(res => res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
