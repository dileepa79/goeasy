import {Component} from 'angular2/core';
import {NoteRequest} from './note-request';
import {NotesService} from '../services/notes.service';
import {TimeLineComponent} from '../timeline/timeline.component';
import { TagsSelectorComponent } from '../tags/tags-selector.component';
import { MODAL_DIRECTIVES } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'add-note',
    templateUrl: './app/notes/add-note.component.html',
    providers: [
        NotesService
    ],
    directives: [TimeLineComponent, TagsSelectorComponent, MODAL_DIRECTIVES]
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
    tags: any[] = [];

    Save() {
        this._notesService.addNote(this.noteRequest);
    }

    Share() {
        console.log('Share This Note');
    }

    onSelectedTagsChanged(tags: any[]): void {
        this.noteRequest.tags = tags.map(function (d) { return d['name']; });
    }
}