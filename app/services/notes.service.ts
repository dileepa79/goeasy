import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Router} from 'angular2/router';

@Injectable()
export class NotesService {
    constructor(private _router: Router,private http: Http) {
    }

    public addNote(noteRequest) {
        console.log("Title: " + noteRequest.title + ", description: " + noteRequest.description);

        var body = "Title=" + noteRequest.title + "&Description=" + noteRequest.description + "&Tags=" + noteRequest.tags;
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new RequestOptions({ headers: headers });
        
        this.http.post('http://localhost:54736/api/Note', body, options)
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
