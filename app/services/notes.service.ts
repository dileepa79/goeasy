import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Router} from 'angular2/router';
import {Configuration} from '../app.constants';

@Injectable()
export class NotesService {
    private webApiUrl: string;
    constructor(private _router: Router, private http: Http, private _configuration: Configuration) {
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
        var headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        var options = new RequestOptions({ headers: headers });
        
        this.http.post(this.webApiUrl, body, options)
            .map(res => res.json())
            .subscribe(
                data => {
                    console.log("added note: " + data);
                },
                err => console.log("error: " + JSON.stringify(err)),
                () => {
                    this._router.navigate(['TimeLine']);
                }
            );
    }
}
