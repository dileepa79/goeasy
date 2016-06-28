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
import {UserProfileService} from '../services/user_profile.service';
import { Tag } from '../tags/tags-response';
import { FileUploaderComponent, FileToUpload } from '../fileuploader/file-uploader.component';
import {LoadingComponent} from '../loader/loading.component';
import {NoteEditorComponent} from '../notes/note-editor.component';
declare var $;
declare var ip_country;

export class UserProfileData {
    email: string;
    name: string;
    profileImageId: string;
	userTags:any[];
}

@Component({
    selector: 'add-note',
    templateUrl: './app/notes/add-note.component.html',
    providers: [
        NotesService,
		UserProfileService
    ],
    directives: [TagsSelectorComponent, MODAL_DIRECTIVES, Editor, Header, UsersSelectorComponent, FileUploaderComponent, NoteEditorComponent]
})

export class AddNoteComponent implements OnInit {
    constructor(private _notesService: NotesService, public _router: Router, private _passTagService: PassTagService, private _userProfileService: UserProfileService, private zone: NgZone) {
        (<any>window).angularComponentRef = {
            zone: this.zone, 
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
	
	public userProfileData: UserProfileData = {
        email: '',
        name: '',
        profileImageId: '',
		userTags:[]
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
    initialTags: any[] = [];

    @Input() showCloseButton: boolean = false;
    ngOnInit() {
		this.active = false;
        this._userProfileService.getUserProfile()
		.subscribe(data => {
			this.userProfileData = JSON.parse(JSON.stringify(data));
			this.initialTags.push(this.userProfileData.name);
			if(this.userProfileData.userTags && this.userProfileData.userTags.length > 0){
				var tags = this.userProfileData.userTags;
				for(var x=0;x<tags.length;x++){
					this.initialTags.push(tags[x].description);
				}
			}
			this.istagSelectionValidated = true;
			this.isToggle = false;
			this.initialTags.push(ip_country);
			this.noteRequest.tags = this.initialTags;
			this.active = true;
			},
		error => {
			this.errorMessage = <any>error,
			console.log(this.errorMessage);
		},
		() => () => console.log("Done"));	
		

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

        (<any>window).loadingComponentRef.zone.run(function () { (<any>window).loadingComponentRef.component.show(); });
        this._notesService.addNote(this.noteRequest)
            .subscribe(note => {
                this.tagList = '';
                for (var i = 0; i < note.tags.length; i++) {
                    this.tagList = this.tagList + (note.tags[i].name + (note.tags.length != i + 1 ? ',' : ''));
                }
                this.clear();
                (<any>window).loadingComponentRef.zone.run(function () { (<any>window).loadingComponentRef.component.hide(); });
                if (this.isFromSlider) {
                    if (this.isToggle)
                        this._router.navigate(['/timeline', { tags: this.tagList + ',,' }]);
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
                (<any>window).loadingComponentRef.zone.run(function () { (<any>window).loadingComponentRef.component.hide(); });
            },
            () => () => {
                console.log("Done");
                (<any>window).loadingComponentRef.zone.run(function () { (<any>window).loadingComponentRef.component.hide(); });
            });
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
        this.noteRequest = new NoteRequest('', '', [], [], [] ,[]);
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    TagsAdded(tags: any[]): void {
        var stringTags: any[] = [];

        this.initialTags.map(function (item) {
            stringTags.push(item);
        });

        //var existingTags = this.noteRequest.tags.map(function (item) {
        //    return item.toString().toLowerCase();
        //});

        tags.map(function (e) {
            stringTags.push(e);
            //if (existingTags.indexOf(e.toLowerCase()) == -1) {
                
            //}
        });

        stringTags = this.removeDuplicates(stringTags);

        if (stringTags.length != 0) {
            this.noteRequest.tags.length = 0;
            this.noteRequest.tags = stringTags;

            (<any>window).AutoCompleteComponentRef.zone.run(function () { (<any>window).AutoCompleteComponentRef.component.LoadExternalInputData(true); });
        }
    }

    removeDuplicates(num) {
        var x,
            len = num.length,
            out = [],
            obj = {};

        for (x = 0; x < len; x++) {
            obj[num[x]] = 0;
        }
        for (x in obj) {
            if (x != 'undefined')
                out.push(x);
        }
        return out;
    }

    TagsAddedDesc(event: string): void {
        this.noteRequest.description = event;
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