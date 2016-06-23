import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Configuration} from '../app.constants';
import {AuthService} from './auth.service';

@Injectable()
export class NotesService {
    private webApiUrl: string;
    //tags: string = '';
    tags: any;
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
        //console.log("Title: " + noteRequest.title + ", description: " + noteRequest.description);

        //var body = JSON.stringify(noteRequest);
        ////var headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        //var headers = this._authService.getHeader();
        //headers.append('Content-Type', 'application/json; charset=utf-8');
        //var options = new RequestOptions({ headers: headers });
        //return this.http.post(this.webApiUrl + '/AddNote', body, options)
        //    .map(res => res.json())
        //    .do(data => console.log(data))
        //    .catch(this.handleError);
        var apiUrl = this.webApiUrl + '/AddNoteWithAttachments';
       // var apiUrl = this.webApiUrl + '/AddNote';
        return this.callApi(apiUrl, noteRequest);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private callApi(url: string, noteRequest): Observable<NotesService> {
        // Create FormData object and attach files and other data into it and send to api
        // as angulr 2 still not support sending files to backend
        // We can change this once angular 2 support it
         
        var key = this.getAuthToken();

        return Observable.create(observer => {
        let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();

            // for (let i = 0; i < files.length; i++) {

            formData.append("title", noteRequest.title);
            formData.append("tags", noteRequest.tags);
            formData.append("users", noteRequest.users);
            formData.append("description", noteRequest.description);
            if (noteRequest.filesToUpload) {
                for (var item of noteRequest.filesToUpload) {
                    //formData.append("file", noteRequest.filesToUpload[0]);
                    formData.append("file", item.file);
                }
            }
           // var files = noteRequest.filesToUpload[0].file;
           // formData.append("file", files);
            
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 201) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(this.handleError);
                    }
                }
            };

            //we might need to show the progress later
            //xhr.upload.onprogress = (event) => {
            //    this.progress = Math.round(event.loaded / event.total * 100);

            //    this.progressObserver.next(this.progress);
            //};

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + key);

            xhr.send(formData);
        });
    }

    private getAuthToken() {
        var headers = this._authService.getHeader();
        var key = headers._headersMap.entries().next().value[1][0].slice(7);
        return key;
    }

    public share(request) {
        //console.log("Title: " + request.title + ", description: " + request.description);

        var body = JSON.stringify(request);
        //var headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        var headers = this._authService.getHeader();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var options = new RequestOptions({ headers: headers });

        return this.http.post(this.webApiUrl + '/ShareNote', body, options)
            .map((res) => { return <any[]>res.json() });
    }
}
