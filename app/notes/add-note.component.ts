import {Component} from 'angular2/core';
import {NoteRequest} from './note-request';
import {NotesService} from '../services/notes.service';
import {TimeLineComponent} from '../timeline/timeline.component';

@Component({
    selector: 'add-note',
    templateUrl: './app/notes/add-note.component.html',
    providers: [
        NotesService
    ],
    directives: [TimeLineComponent],
})

export class AddNoteComponent {
    constructor(private _notesService: NotesService) {
    }
    public noteRequest: NoteRequest = {
        title: '',
        description: '',
        tags: []
    };
    title = "ADD NOTES";

    Save() {
        this._notesService.addNote(this.noteRequest);
    }
}