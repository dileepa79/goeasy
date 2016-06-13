import {Component, OnInit, NgZone, Input} from '@angular/core';
import {NoteRequest} from './note-request';
import {NotesService} from '../services/notes.service';
//import {TimeLineComponent} from '../timeline/timeline.component';
import { TagsSelectorComponent } from '../tags/tags-selector.component';
import { UsersSelectorComponent } from '../noteshareusers/users-selector.component';
import { MODAL_DIRECTIVES } from '../modal/modaldialog';
import {Editor} from 'primeng/primeng';
import {Header} from 'primeng/primeng';
import { Router} from '@angular/router';
import {PassTagService} from '../services/passtag.service';
import { Tag } from '../tags/tags-response';
import { FileUploaderComponent, FileToUpload } from '../fileuploader/file-uploader.component';

@Component({
    selector: 'add-note',
    templateUrl: './app/notes/add-note.component.html',
    providers: [
        NotesService
    ],
    directives: [TagsSelectorComponent, MODAL_DIRECTIVES, Editor, Header, UsersSelectorComponent, FileUploaderComponent]
})

export class AddNoteComponent implements OnInit{
    constructor(private _notesService: NotesService, public _router: Router, private _passTagService: PassTagService, private zone: NgZone) {
        window.angularComponentRef = {
            zone: this.zone,
           // componentFn: (value) => this.callFromOutside(value), 
            component: this
        };
    }
    public noteRequest: NoteRequest = {
        title: '',
        description: '',
        tags: [],
        users: [],
        filesToUpload: [],
        attachments:[]
    };

    heading = "ADD NOTES";
    tags: any[] = [];
    users: any[] = [];
    errorMessage: string;
    tagList: string = '';
    active = true;
    tagsStr: string='';
    istagSelectionValidated: boolean;
    isFromSlider: boolean = false;
    isToggle: boolean = false;
    passedTags: Tag[] = [];
    @Input() showCloseButton: boolean = false;
    ngOnInit() {
        this.istagSelectionValidated = true;
        this.isToggle = false;
    }

    Save() {
        let inputTagStr = $('#tagInput').text();
        if (inputTagStr.trim() == '') {
            if (this.noteRequest.tags.length == 0) {
                this.istagSelectionValidated = false;
                return;
            }
            else
                this.istagSelectionValidated = true;

            this.isFromSlider = false;
        }
        else {
            this.noteRequest.tags = inputTagStr.trim().split(",");
            this.istagSelectionValidated = true;
            this.isFromSlider = true;
        }

        this._notesService.addNote(this.noteRequest)
            .subscribe(note => {
                    this.tagList = '';
                    for (var i = 0; i < note.tags.length; i++) {
                        this.tagList = this.tagList + (note.tags[i].name + (note.tags.length != i + 1 ? ',' : ''));
                    }
                    this.clear();
                    if (this.isFromSlider) {
                        if (this.isToggle)
                            this._router.navigate(['/timeline', { tags: this.tagList + ',,'}]);
                        else
                            this._router.navigate(['/timeline', { tags: this.tagList + ',' }]);

                        this.isToggle = !this.isToggle;
                    }
                    else {
                        this._router.navigate(['/timeline', { tags: this.tagList }]);
                    }
                },
                error => {
                    this.errorMessage = <any>error,
                        console.log(this.errorMessage);
                },
                () => () => console.log("Done"));
    }

    Share() {
        console.log('Share This Note');
    }

    onSelectedTagsChanged(tags: any[]): void {
        this.noteRequest.tags = tags.map(function (d) { return d['name']; });

        if (this.noteRequest.tags.length == 0) {
            this.istagSelectionValidated = false;
        }
        else
            this.istagSelectionValidated = true;
    }

    onSelectedUsersChanged(users: any[]): void {
        this.noteRequest.users = users.map(function (d) { return d['userName']; });
    }
    clear() {
        this.noteRequest = new NoteRequest('', '', [], []);
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }


    updateSelectedTags() {
        this.tagsStr = this._passTagService.getTags();
        console.log('calledFromOutside ' + this._passTagService.getTags());

        if (this.tagsStr != null) {
            var tagsArr = this.tagsStr.split(",");
            for (var i = 0; i < tagsArr.length; i++) {
                var tag: any = tagsArr[i];
                this.passedTags.push(tag);
            }
            this.noteRequest.tags = this.passedTags;
        }
        console.log('calledFromOutside tags ' + this.noteRequest.tags);  
    }

    Close() {
        this.clear();
    }
}