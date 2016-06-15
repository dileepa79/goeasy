
import {Component, OnInit, Input} from '@angular/core';
import {NotesService} from '../services/notes.service';
import {TimeLineService} from '../services/timeline.service';
import {TimeLineResponse} from './timeline-response';
import {TimeLineRequest} from './timeline-request';
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

@Component({
    selector: 'timeline',
    templateUrl: './app/timeline/timeline.component.html',
    providers: [
        TimeLineService ,NotesService
    ],
    directives: [TagsSelectorComponent, TimelineInfo, TimelineGroup, TimelineDetail, TimelineDetailGroup, InfiniteScroll , MODAL_DIRECTIVES, ShareTimelineComponent, UsersSelectorComponent]
})

export class TimeLineComponent implements OnInit, CanDeactivate {
    public oneAtATime: boolean = true;
    tagsStr: string = '';
    tagsResponce: TagsResponse;
    isLoading: boolean = false;
    fileApiUrl;

    constructor(private _timeLineService: TimeLineService,private _noteService: NotesService, routeSegment: RouteSegment, private passTagService: PassTagService, private _configuration: Configuration) {
        this.tagsStr = routeSegment.getParam('tags');
        this.fileApiUrl = _configuration.ServerWithApiUrl + 'FileContent';
    }
	
    selectedTags: any[];
    title = "TIMELINE";
    errorMessage: string;
    timelines: any[];
    filteredTimelines: any[];
    timeLinesList: any[];
    passedTags: Tag[] = [];
    selectedTagStr: string = '';
	users: any[] = [];
    note_id: string;
    isInitialLoad: boolean = false;
    counter: number = 0; 
    showlabel: boolean = false;
    public timeLineRequest: TimeLineRequest = {
        data: [],
        isPersistedSearch: false,
        pageNo: 1,
        pageSize: 10
    };

    ngOnInit() {
        
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

        this.getTimelines();
    }

    onScroll() {
        //if (!this.isLoading)
        if (this.timeLineRequest.pageNo > 1)
            this.getTimelines();
    }

    routerCanDeactivate(currTree?: any, futureTree?: any) {
        this.timeLineRequest.isPersistedSearch = true;
        this.getTimelines();

        return Observable.of(true).delay(200).toPromise();
    }

    onSelectedTagsChanged(tags: any[]): void {
        if (this.tagsStr != null && this.isInitialLoad) {

            this.counter = this.counter + 1;
            if (this.counter == this.passedTags.length) {
                this.isInitialLoad = false;
                this.counter = 0;
            }  
        }
        else {
            this.timeLineRequest.data = tags.map(function (d) { return d['name']; });
            this.timeLineRequest.isPersistedSearch = false;
            this.timeLineRequest.pageNo = 1;
            this.filteredTimelines = [];
            this.timeLinesList = [];
            this.isLoading = false;
            this.getTimelines();
        }
    }

    getSelectedTags() {
        this.selectedTagStr = '';

        for (var i = 0; i < this.timeLineRequest.data.length; i++) {
            this.selectedTagStr = this.selectedTagStr + (this.timeLineRequest.data[i] + (this.timeLineRequest.data.length != i + 1 ? ',' : ''));
        }
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

    getTimelines() {
        this._timeLineService.getTimeLines(this.timeLineRequest)
            .subscribe(timelines => {
                //if (timelines.length <= 0) {
                //    this.showlabel = true;
                //    return;
                //}
                if (this.isLoading) return;
                this.isLoading = true;
                this.timelines = timelines;
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

                console.log(timelines);
                console.log(this.filteredTimelines);
                for (var x = 0; x < timelines.length; x++) {
                    timelines[x].isLabled = true;
                    this.filteredTimelines.push(timelines[x]);
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
                console.log(result);

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
                        this.timeLinesList[y].availableThreadsCountText = this.timeLinesList[y].items.length.toString() + " Threads Available";
                    else
                        this.timeLinesList[y].availableThreadsCountText = this.timeLinesList[y].items.length.toString() + " Thread Available";
                }

                if (this.timelines.length > 0) {
                    this.timeLineRequest.pageNo = this.timeLineRequest.pageNo + 1;
                    this.isLoading = false;
                }
                //else {
                //    this.isLoading = true;
                //}
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
            () => () => console.log("Done"));
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
}

