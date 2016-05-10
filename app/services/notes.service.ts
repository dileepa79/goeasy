import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Router} from 'angular2/router';
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
        
        this.http.post(this.webApiUrl + '/AddNote', body, options)
            .map(res => res.json())
            .subscribe(
                data => {
                    console.log("added note: " + data);
                },
                err => console.log("error: " + JSON.stringify(err)),
                () => {
                    for (var i = 0; i < noteRequest.tags.length; i++) {
                        this.tags = this.tags + (noteRequest.tags[i] + (noteRequest.tags.length != i + 1 ? ',' : ''));
                    }
                    this._router.navigate(['TimeLine', { tags: this.tags }]);
                }
            );
    }
}
