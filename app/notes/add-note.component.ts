import {Component, OnInit, NgZone, Input} from '@angular/core';
import {NoteRequest} from './note-request';
import {NotesService} from '../services/notes.service';
import {UserProfileData} from '../userprofile/userprofile.component';
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
    automaticInitialTags: any[] = [];
    userAddedTags: any[] = [];

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
			this.initialTags.push(ip_country.trim());
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
        var automaticInitialTags = this.automaticInitialTags;
        var userAddedTags: any[] = [];

        //Identify user entered tags via Autocomplete component
        this.noteRequest.tags = tags.map(function (d) {
            var tag = d['name'];
            if (automaticInitialTags.indexOf(tag) === -1) {
                userAddedTags.push(tag);
            }
            return tag;
        });

        this.userAddedTags = userAddedTags;

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

        //automaticInitialTags = InitialTags + Automatic tags
        var automaticInitialTags: any[] = [];

        //Get existing tags from AutoComplete component 
        var existingTags = this.noteRequest.tags.map(function (item) {
            return item.toString().toLowerCase();
        });

        //Add initial tags if exists in existingTags array.
        this.initialTags.map(function (item) {
            if (existingTags.indexOf(item.toLowerCase()) !== -1) {
                stringTags.push(item);
                automaticInitialTags.push(item);
            }
        });

        this.userAddedTags.map(function (item) {
            if (existingTags.indexOf(item.toLowerCase()) !== -1) {
                stringTags.push(item);
            }
        });

        tags.map(function (e) {
            stringTags.push(e);
            automaticInitialTags.push(e);
        });

        //Case insensitive duplicate removal
        stringTags = stringTags.reduce(function (a, b) {
            var strArray = a.toString().toLowerCase().split(',')
            if (strArray.indexOf(b.toLowerCase()) < 0) a.push(b);
            return a;
        }, []);

        this.automaticInitialTags = automaticInitialTags;

        if (stringTags.length != 0) {
            this.noteRequest.tags.length = 0;
            this.noteRequest.tags = stringTags;         
            (<any>window).AutoCompleteComponentRef.zone.run(function () { (<any>window).AutoCompleteComponentRef.component.LoadExternalInputData(true); });
        }
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