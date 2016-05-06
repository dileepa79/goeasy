import {Component} from 'angular2/core';
import {NoteRequest} from './note-request';
import {NotesService} from '../services/notes.service';
import {TimeLineComponent} from '../timeline/timeline.component';
import { TagsSelectorComponent } from '../tags/tags-selector.component';
import { MODAL_DIRECTIVES } from 'ng2-bs3-modal/ng2-bs3-modal';
import {Editor} from 'primeng/primeng';
import {Header} from 'primeng/primeng';

@Component({
    selector: 'add-note',
    templateUrl: './app/notes/add-note.component.html',
    providers: [
        NotesService
    ],
    directives: [TimeLineComponent, TagsSelectorComponent, MODAL_DIRECTIVES, Editor, Header]
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
   // text1: string = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';;

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