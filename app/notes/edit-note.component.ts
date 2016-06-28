import {Component, OnInit, Input, NgZone} from '@angular/core';
import {Editor} from 'primeng/primeng';
import {Header} from 'primeng/primeng';
import {NotesService} from '../services/notes.service';

export class EditNoteRequest {
    ID: number;
    Title: string;
    Description: string;
}

@Component({
    selector: 'edit-note',
    inputs: ['title', 'description', 'id'],
    templateUrl: './app/notes/edit-note.component.html',
    providers: [
        NotesService
    ],
    directives: [Editor, Header]
})

    export class EditNoteComponent implements OnInit {
    title: string;
    description: string;
    id: number;
    errorMessage: string = "";
    constructor(private _notesService: NotesService, private zone: NgZone) {
    }

    heading = "EDIT NOTES";
    public editNoteRequest: EditNoteRequest = {
        ID: 0,
        Title: '',
        Description: '',
    };
    ngOnInit() {
        this.editNoteRequest.Title = this.title;
        this.editNoteRequest.Description = this.description;
        this.editNoteRequest.ID = this.id;
    }

    Save() {
        this._notesService.editNote(this.editNoteRequest)
            .subscribe(note => {
                var result = JSON.parse(note._body);
                (<any>window).timelineComponentRef.zone.run(function () { (<any>window).timelineComponentRef.component.toggleOpenEditNoteWithoutEvent(result); });
            },
            error => {
                this.errorMessage = <any>error,
                    console.log(this.errorMessage);
            },
            () => () => {
                console.log("Done");
            });
    }
    Close() {
    }
}