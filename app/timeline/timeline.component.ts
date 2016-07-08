import { Router} from '@angular/router';
import {Component, OnInit, Input, NgZone} from '@angular/core';
import {NotesService} from '../services/notes.service';
import {UserProfileService} from '../services/user_profile.service';
import {UserProfileData} from '../userprofile/userprofile.component';
import {TimeLineService} from '../services/timeline.service';
import {TimeLineResponse} from './timeline-response';
import {TimeLineRequest} from './timeline-request';
import {TimeLineTagSearchRequest, TimeLineSearchRequest} from './timeline-search-request';
import { TagsResponse, Tag } from '../tags/tags-response';
import { TagsSelectorComponent } from '../tags/tags-selector.component';
import {TimelineInfo, TimelineGroup} from './timelinegroup/timelinegroup.component';
import {TimelineDetail, TimelineDetailGroup} from './timelinegroup/timelinedetail.component';
import {RouteSegment, CanDeactivate} from '@angular/router'
import { Observable } from 'rxjs/Observable';
import {PassTagService} from '../services/passtag.service';
import {InfiniteScroll} from '../timeline/angular2-infinite-scroll'
import {Configuration } from '../app.constants';
import { ShareTimelineComponent } from '../sharetimeline/sharetimeline.component';
import { UsersSelectorComponent } from '../noteshareusers/users-selector.component';
import { MODAL_DIRECTIVES, ModalComponent } from '../modal/modaldialog';
import {EditNoteComponent} from '../notes/edit-note.component';
declare var $;
declare var ip_country;

@Component({
    selector: 'timeline',
    templateUrl: './app/timeline/timeline.component.html',
    providers: [
        TimeLineService ,NotesService,UserProfileService
    ],
    directives: [TagsSelectorComponent, TimelineInfo, TimelineGroup, TimelineDetail, TimelineDetailGroup, InfiniteScroll, MODAL_DIRECTIVES, ShareTimelineComponent, UsersSelectorComponent, EditNoteComponent]
})


export class TimeLineComponent implements OnInit, CanDeactivate {
    public oneAtATime: boolean = true;
    tagsStr: string = '';
    tagsResponce: TagsResponse;
    isLoading: boolean = false;
    fileApiUrl;

	public userProfileData: UserProfileData = {
        email: '',
        name: '',
        profileImageId: '',
		userTags:[]
    };
	
    constructor(private _timeLineService: TimeLineService, private _noteService: NotesService, private _userProfileService: UserProfileService , routeSegment: RouteSegment,
        private _router: Router, private passTagService: PassTagService, private _configuration: Configuration, private zone: NgZone) {
        this.tagsStr = routeSegment.getParam('tags');
        this.fileApiUrl = _configuration.ServerWithApiUrl + 'FileContent';
        (<any>window).timelineComponentRef = {
            zone: this.zone,
            component: this
        };
    }
	
    selectedTags: any[];
    title = "TIMELINE";
    errorMessage: string;
    timelines: any[];
    filteredTimelines: any[];
    timeLinesList: any[];
	popularTags: any[];
    passedTags: Tag[] = [];
    selectedTagStr: string = '';
	users: any[] = [];
    note_id: string;
    isInitialLoad: boolean = false;
    counter: number = 0; 
    showlabel: boolean = false;
    loadingLabelHide: boolean = false;
    totalPages: number = 0;
    private _isOpen: boolean = false;
    private _selectedId: number = 0;
    initialTags: any[] = [];	
    time: Date;
	
    public timeLineRequest: TimeLineRequest = {
        data: [],
        isPersistedSearch: false,
        pageNo: 1,
        pageSize: 10
    };

    public timeLineTagSearchRequest: TimeLineTagSearchRequest = {
        data: []
    }

    public timeLineSearchRequest: TimeLineSearchRequest = {
        data: []
    }

    ngOnInit() {
		
        this._userProfileService.getUserProfile()
		.subscribe(data => {
			this.userProfileData = JSON.parse(JSON.stringify(data));
			if(this.userProfileData.userTags && this.userProfileData.userTags.length > 0){
				var tags = this.userProfileData.userTags;
				for(var x=0;x<tags.length;x++){
					this.initialTags.push(tags[x].description);
				}
			}
			if(this.userProfileData.name != '')
				this.initialTags.push(this.userProfileData.name);	
			if(ip_country != '')				
				this.initialTags.push(ip_country);	
		});
		
        if (this.tagsStr != null) {
            var tagsArr = this.tagsStr.split(",");
            for (var i = 0; i < tagsArr.length; i++) {
                if (tagsArr[i].trim().length > 0) {
                    var tag: any = tagsArr[i];
                    this.passedTags.push(tag);
                }
            }
            this.timeLineRequest.data = this.passedTags;
            this.isInitialLoad = true;
        }
		
		if (typeof this.popularTags == 'undefined') {
			this.popularTags = new Array();
        }
        this.time = new Date();
        this.getTimelines();
		this.getPopularTags();
    }

    onScroll() {
        if (this.timeLineRequest.pageNo > 1)
            this.getTimelines();
    }

    routerCanDeactivate(currTree?: any, futureTree?: any) {
        this.isLoading = false;
        //this.timeLineRequest.isPersistedSearch = true;
        //this.getTimelines();
        var dateDiffInSeconds = (new Date().getTime() - this.time.getTime()) / 1000;

        if (dateDiffInSeconds <= 60 && this.timeLineSearchRequest.data.length > 0)
            this.timeLineSearchRequest.data.pop();

        this.postTimeLineTagSearchRequests();

        return Observable.of(true).delay(200).toPromise();
    }

    onSelectedTagsChanged(tags: any[]): void {
        if (this.tagsStr != null && this.isInitialLoad) {

            this.counter = this.counter + 1;
            if (this.counter == this.passedTags.length) {
                this.isInitialLoad = false;
                this.counter = 0;

                this.time = new Date();
                this.timeLineTagSearchRequest.data = this.timeLineRequest.data;
                var timeLineTagSearchRequestObject = JSON.parse(JSON.stringify(this.timeLineTagSearchRequest));
                this.timeLineSearchRequest.data.push(timeLineTagSearchRequestObject);
            }  
        }
        else {
            this.timeLineRequest.data = tags.map(function (d) { return d['name']; });
            this.timeLineRequest.isPersistedSearch = false;
            this.timeLineRequest.pageNo = 1;
            this.filteredTimelines = [];
            this.timeLinesList = [];
            this.isLoading = false;
            this.loadingLabelHide = false;
            this.getTimelines();

            var dateDiffInSeconds = (new Date().getTime() - this.time.getTime()) / 1000;

            if (dateDiffInSeconds <= 60 && this.timeLineSearchRequest.data.length > 0)
                this.timeLineSearchRequest.data.pop();

            this.time = new Date();
            this.timeLineTagSearchRequest.data = this.timeLineRequest.data;
            var timeLineTagSearchRequestObject = JSON.parse(JSON.stringify(this.timeLineTagSearchRequest));
            this.timeLineSearchRequest.data.push(timeLineTagSearchRequestObject);
        }
    }

	getPopularTags(){
		this._timeLineService.getMostPopularTags(this.timeLineRequest).subscribe(lines => { 
			this.popularTags = JSON.parse(JSON.stringify(lines));
			console.log('len = ' +  this.popularTags.length);
			console.log('len = ' +  this.popularTags[0].count);
		});
    }

    selectTrend(tags: any[]) {
        //this.timeLineRequest.data.length = 0;
        this.timeLineRequest.data = tags.map(function (d) { return d['name']; });
        let tagList = '';

        for (var i = 0; i < this.timeLineRequest.data.length; i++) {
            tagList = tagList + (this.timeLineRequest.data[i] + (this.timeLineRequest.data.length != i + 1 ? ',' : ''));
        }

        this._router.navigate(['/timeline', { tags: tagList }]);
        //(<any>window).AutoCompleteComponentRef.zone.run(function () { (<any>window).AutoCompleteComponentRef.component.LoadExternalInputData(); });
    }
	
    getSelectedTags() {
        this.selectedTagStr = '';
		
		if(this.initialTags && this.initialTags.length > 0)
			this.selectedTagStr = this.initialTags.join();
			
		if(this.initialTags.length > 0 && this.timeLineRequest.data.length > 0)
			this.selectedTagStr += ',';
			
        for (var i = 0; i < this.timeLineRequest.data.length; i++) {
            this.selectedTagStr = this.selectedTagStr + (this.timeLineRequest.data[i] + (this.timeLineRequest.data.length != i + 1 ? ',' : ''));
        }
		
		var uniqueList=this.selectedTagStr.split(',').filter(function(item,i,allItems){
			return i==allItems.indexOf(item);
		}).join(',');
		
		this.selectedTagStr = uniqueList;
		
        this.passTagService.setTags(this.selectedTagStr);
        $('#tagInput').text(this.selectedTagStr);
		
		 var selectedTagArray = this.selectedTagStr.split(",");
		 var selected = '<span>&nbsp;</span>';
		 for (var i = 0; i < selectedTagArray.length; i++) {
			selected += '<span class="common-tag">' + selectedTagArray[i] + '</span>';
		 }
		$('#tagInput1').html(selected);	
		
    }

    groupBy(array: any[], f) {
        var groups = {};
        array.forEach(function (o) {
            var group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return Object.keys(groups).map(function (group) {
            return groups[group];
        })
    }

    postTimeLineTagSearchRequests() {
        this._timeLineService.postTimeLineTagSearchRequests(this.timeLineSearchRequest).
            subscribe(req => { },
            error => {
                this.errorMessage = <any>error,
                    console.log(this.errorMessage);
            },
            () => () => {
                console.log("Done");
            })
    }

    getTimelines() {
        if (this.isLoading) return;
        this.isLoading = true;
        this._timeLineService.getTimeLines(this.timeLineRequest)
            .subscribe(timelines => {

                this.timelines = timelines.group;
                this.totalPages = timelines.totalPages;
                if (typeof this.filteredTimelines == 'undefined') {
                    this.filteredTimelines = new Array();
                }

                if (this.filteredTimelines.length > 0) {
                    for (var x = 0; x < this.filteredTimelines.length; x++) {
                        if (this.filteredTimelines[x].isLabled == false) {
                            this.filteredTimelines.splice(x, 1);
                        }
                    }
                }

                console.log(this.timelines);
                console.log(this.filteredTimelines);
                for (var x = 0; x < this.timelines.length; x++) {
                    this.timelines[x].isLabled = true;
                    this.filteredTimelines.push(this.timelines[x]);
                }

                for (var y = 0; y < this.filteredTimelines.length; y++) {
                    if (y == this.filteredTimelines.length - 1) { break; }
                    if (this.filteredTimelines[y].dateFormat == this.filteredTimelines[y + 1].dateFormat) {
                        this.filteredTimelines[y + 1].isLabled = false;
                    }
                }
                var result = this.groupBy(this.filteredTimelines, function (item) {
                    return [item.dateFormat];
                });
                console.log(result+"fdsf");

                if (typeof this.timeLinesList == 'undefined') {
                    this.timeLinesList = new Array();
                }
                else {
                    this.timeLinesList = [];
                }
                console.log(this.timeLinesList);

                for (var y = 0; y < result.length; y++) {
                    for (var z = 0; z < result[y].length; z++) {
                        if (result[y][z].isLabled == true) {
                            this.timeLinesList.push(result[y][z]);
                        }
                        else {
                            for (var x = 0; x < this.timeLinesList.length; x++) {
                                if (result[y][z].dateFormat == this.timeLinesList[x].dateFormat && this.timeLinesList[x].isLabled == true) {
                                    for (var a = 0; a < result[y][z].items.length; a++) {
                                        this.timeLinesList[x].items.push(result[y][z].items[a])
                                    }

                                }
                            }
                        }
                    }
                }
                console.log(this.timeLinesList);
                for (var y = 0; y < this.timeLinesList.length; y++) {
                    if (this.timeLinesList[y].items.length > 1)
                        this.timeLinesList[y].availableThreadsCountText = this.timeLinesList[y].items.length.toString() + " Notes Available";
                    else
                        this.timeLinesList[y].availableThreadsCountText = this.timeLinesList[y].items.length.toString() + " Note Available";
                }

                if (this.timeLineRequest.pageNo < this.totalPages) {
                    this.timeLineRequest.pageNo = this.timeLineRequest.pageNo + 1;
                    this.isLoading = false;
                }
                else {
                    this.loadingLabelHide = true;
                }
                if (this.timeLinesList.length > 0)
                    this.showlabel = false;
                else
                    this.showlabel = true;
                console.log(this.timelines);
                console.log(this.filteredTimelines);

            },
            error => {
                this.errorMessage = <any>error,
                    console.log(this.errorMessage);
                this.isLoading = false;
            },
            () => () => {
                console.log("Done");
                this.isLoading = false;
            });
    }
	
	setCurrentNote(selected_note: any) {
        this.note_id = selected_note.id;
    }

    onSelectedUsersChanged(_users: any[]): void {
        this.users = _users.map(function (d) { return d['userName']; });
    }
	
	shareNote() {
		var note_share = {
			Note: this.note_id,
			AppUsers:this.users
		}
		var noteShareResponse: any;
		this._noteService.share(note_share).subscribe(res => noteShareResponse = res);
    }
    selectedNote: any;
    toggleOpenEditNote(event, note) {
        this.selectedId = note.id;
        this.selectedNote = note;
        console.log(note);
        event.preventDefault();
        this.isEditNoteOpen = !this.isEditNoteOpen;
    }
    toggleOpenEditNoteWithoutEvent(note) {
        this.selectedId = note.id;
        this.isEditNoteOpen = !this.isEditNoteOpen;
//        this.selectedNote = note;

//        this.selectedNote.id = note.id;
//        this.selectedNote.createDate = note.createDate;
        console.log(note.title);
        this.selectedNote.title = note.title;
        this.selectedNote.description = note.description;
//        this.selectedNote.activityType = note.activityType;
//        this.selectedNote.userImageUrl = note.userImageUrl;
//        this.selectedNote.date = note.date;
//        this.selectedNote.dateMonth = note.dateMonth;
//        this.selectedNote.dateDay = note.dateDay;
//        this.selectedNote.time = note.time;
//        this.selectedNote.timeHourMin = note.timeHourMin;
//        this.selectedNote.timeAMPM = note.timeAMPM;
//        this.selectedNote.imageUrl = note.imageUrl;
//        this.selectedNote.tags = note.tags;
//        this.selectedNote.attachments = note.attachments;
        this.selectedNote.plainDescriptionText = note.plainDescriptionText;
    }

    public get isEditNoteOpen(): boolean { return this._isOpen; }

    public set isEditNoteOpen(value: boolean) {
        this._isOpen = value;
    }
    public get selectedId(): number { return this._selectedId; }

    public set selectedId(value: number) {
        this._selectedId = value;
    }
}

