System.register(['@angular/router', '@angular/core', '../services/notes.service', '../services/user_profile.service', '../services/timeline.service', '../tags/tags-selector.component', './timelinegroup/timelinegroup.component', './timelinegroup/timelinedetail.component', 'rxjs/Observable', '../services/passtag.service', '../timeline/angular2-infinite-scroll', '../app.constants', '../sharetimeline/sharetimeline.component', '../noteshareusers/users-selector.component', '../modal/modaldialog', '../notes/edit-note.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var router_1, core_1, notes_service_1, user_profile_service_1, timeline_service_1, tags_selector_component_1, timelinegroup_component_1, timelinedetail_component_1, router_2, Observable_1, passtag_service_1, angular2_infinite_scroll_1, app_constants_1, sharetimeline_component_1, users_selector_component_1, modaldialog_1, edit_note_component_1;
    var TimeLineComponent;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (notes_service_1_1) {
                notes_service_1 = notes_service_1_1;
            },
            function (user_profile_service_1_1) {
                user_profile_service_1 = user_profile_service_1_1;
            },
            function (timeline_service_1_1) {
                timeline_service_1 = timeline_service_1_1;
            },
            function (tags_selector_component_1_1) {
                tags_selector_component_1 = tags_selector_component_1_1;
            },
            function (timelinegroup_component_1_1) {
                timelinegroup_component_1 = timelinegroup_component_1_1;
            },
            function (timelinedetail_component_1_1) {
                timelinedetail_component_1 = timelinedetail_component_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (passtag_service_1_1) {
                passtag_service_1 = passtag_service_1_1;
            },
            function (angular2_infinite_scroll_1_1) {
                angular2_infinite_scroll_1 = angular2_infinite_scroll_1_1;
            },
            function (app_constants_1_1) {
                app_constants_1 = app_constants_1_1;
            },
            function (sharetimeline_component_1_1) {
                sharetimeline_component_1 = sharetimeline_component_1_1;
            },
            function (users_selector_component_1_1) {
                users_selector_component_1 = users_selector_component_1_1;
            },
            function (modaldialog_1_1) {
                modaldialog_1 = modaldialog_1_1;
            },
            function (edit_note_component_1_1) {
                edit_note_component_1 = edit_note_component_1_1;
            }],
        execute: function() {
            TimeLineComponent = (function () {
                function TimeLineComponent(_timeLineService, _noteService, _userProfileService, routeSegment, _router, passTagService, _configuration, zone) {
                    this._timeLineService = _timeLineService;
                    this._noteService = _noteService;
                    this._userProfileService = _userProfileService;
                    this._router = _router;
                    this.passTagService = passTagService;
                    this._configuration = _configuration;
                    this.zone = zone;
                    this.oneAtATime = true;
                    this.tagsStr = '';
                    this.isLoading = false;
                    this.userProfileData = {
                        email: '',
                        name: '',
                        profileImageId: '',
                        userTags: []
                    };
                    this.title = "TIMELINE";
                    this.passedTags = [];
                    this.selectedTagStr = '';
                    this.users = [];
                    this.isInitialLoad = false;
                    this.counter = 0;
                    this.showlabel = false;
                    this.loadingLabelHide = false;
                    this.totalPages = 0;
                    this._isOpen = false;
                    this._selectedId = 0;
                    this.initialTags = [];
                    this.timeLineRequest = {
                        data: [],
                        isPersistedSearch: false,
                        pageNo: 1,
                        pageSize: 10
                    };
                    this.tagsStr = routeSegment.getParam('tags');
                    this.fileApiUrl = _configuration.ServerWithApiUrl + 'FileContent';
                    window.timelineComponentRef = {
                        zone: this.zone,
                        component: this
                    };
                }
                TimeLineComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._userProfileService.getUserProfile()
                        .subscribe(function (data) {
                        _this.userProfileData = JSON.parse(JSON.stringify(data));
                        if (_this.userProfileData.userTags && _this.userProfileData.userTags.length > 0) {
                            var tags = _this.userProfileData.userTags;
                            for (var x = 0; x < tags.length; x++) {
                                _this.initialTags.push(tags[x].description);
                            }
                        }
                        if (_this.userProfileData.name != '')
                            _this.initialTags.push(_this.userProfileData.name);
                        if (ip_country != '')
                            _this.initialTags.push(ip_country);
                    });
                    if (this.tagsStr != null) {
                        var tagsArr = this.tagsStr.split(",");
                        for (var i = 0; i < tagsArr.length; i++) {
                            if (tagsArr[i].trim().length > 0) {
                                var tag = tagsArr[i];
                                this.passedTags.push(tag);
                            }
                        }
                        this.timeLineRequest.data = this.passedTags;
                        this.isInitialLoad = true;
                    }
                    if (typeof this.popularTags == 'undefined') {
                        this.popularTags = new Array();
                    }
                    this.getTimelines();
                    this.getPopularTags();
                };
                TimeLineComponent.prototype.onScroll = function () {
                    if (this.timeLineRequest.pageNo > 1)
                        this.getTimelines();
                };
                TimeLineComponent.prototype.routerCanDeactivate = function (currTree, futureTree) {
                    this.isLoading = false;
                    this.timeLineRequest.isPersistedSearch = true;
                    this.getTimelines();
                    return Observable_1.Observable.of(true).delay(200).toPromise();
                };
                TimeLineComponent.prototype.onSelectedTagsChanged = function (tags) {
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
                        this.loadingLabelHide = false;
                        this.getTimelines();
                    }
                };
                TimeLineComponent.prototype.getPopularTags = function () {
                    var _this = this;
                    this._timeLineService.getMostPopularTags(this.timeLineRequest).subscribe(function (lines) {
                        _this.popularTags = JSON.parse(JSON.stringify(lines));
                        console.log('len = ' + _this.popularTags.length);
                        console.log('len = ' + _this.popularTags[0].count);
                    });
                };
                TimeLineComponent.prototype.selectTrend = function (tags) {
                    //this.timeLineRequest.data.length = 0;
                    this.timeLineRequest.data = tags.map(function (d) { return d['name']; });
                    var tagList = '';
                    for (var i = 0; i < this.timeLineRequest.data.length; i++) {
                        tagList = tagList + (this.timeLineRequest.data[i] + (this.timeLineRequest.data.length != i + 1 ? ',' : ''));
                    }
                    this._router.navigate(['/timeline', { tags: tagList }]);
                    //(<any>window).AutoCompleteComponentRef.zone.run(function () { (<any>window).AutoCompleteComponentRef.component.LoadExternalInputData(); });
                };
                TimeLineComponent.prototype.getSelectedTags = function () {
                    this.selectedTagStr = '';
                    if (this.initialTags && this.initialTags.length > 0)
                        this.selectedTagStr = this.initialTags.join();
                    if (this.initialTags.length > 0 && this.timeLineRequest.data.length > 0)
                        this.selectedTagStr += ',';
                    for (var i = 0; i < this.timeLineRequest.data.length; i++) {
                        this.selectedTagStr = this.selectedTagStr + (this.timeLineRequest.data[i] + (this.timeLineRequest.data.length != i + 1 ? ',' : ''));
                    }
                    var uniqueList = this.selectedTagStr.split(',').filter(function (item, i, allItems) {
                        return i == allItems.indexOf(item);
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
                };
                TimeLineComponent.prototype.groupBy = function (array, f) {
                    var groups = {};
                    array.forEach(function (o) {
                        var group = JSON.stringify(f(o));
                        groups[group] = groups[group] || [];
                        groups[group].push(o);
                    });
                    return Object.keys(groups).map(function (group) {
                        return groups[group];
                    });
                };
                TimeLineComponent.prototype.getTimelines = function () {
                    var _this = this;
                    if (this.isLoading)
                        return;
                    this.isLoading = true;
                    this._timeLineService.getTimeLines(this.timeLineRequest)
                        .subscribe(function (timelines) {
                        _this.timelines = timelines.group;
                        _this.totalPages = timelines.totalPages;
                        if (typeof _this.filteredTimelines == 'undefined') {
                            _this.filteredTimelines = new Array();
                        }
                        if (_this.filteredTimelines.length > 0) {
                            for (var x = 0; x < _this.filteredTimelines.length; x++) {
                                if (_this.filteredTimelines[x].isLabled == false) {
                                    _this.filteredTimelines.splice(x, 1);
                                }
                            }
                        }
                        console.log(_this.timelines);
                        console.log(_this.filteredTimelines);
                        for (var x = 0; x < _this.timelines.length; x++) {
                            _this.timelines[x].isLabled = true;
                            _this.filteredTimelines.push(_this.timelines[x]);
                        }
                        for (var y = 0; y < _this.filteredTimelines.length; y++) {
                            if (y == _this.filteredTimelines.length - 1) {
                                break;
                            }
                            if (_this.filteredTimelines[y].dateFormat == _this.filteredTimelines[y + 1].dateFormat) {
                                _this.filteredTimelines[y + 1].isLabled = false;
                            }
                        }
                        var result = _this.groupBy(_this.filteredTimelines, function (item) {
                            return [item.dateFormat];
                        });
                        console.log(result + "fdsf");
                        if (typeof _this.timeLinesList == 'undefined') {
                            _this.timeLinesList = new Array();
                        }
                        else {
                            _this.timeLinesList = [];
                        }
                        console.log(_this.timeLinesList);
                        for (var y = 0; y < result.length; y++) {
                            for (var z = 0; z < result[y].length; z++) {
                                if (result[y][z].isLabled == true) {
                                    _this.timeLinesList.push(result[y][z]);
                                }
                                else {
                                    for (var x = 0; x < _this.timeLinesList.length; x++) {
                                        if (result[y][z].dateFormat == _this.timeLinesList[x].dateFormat && _this.timeLinesList[x].isLabled == true) {
                                            for (var a = 0; a < result[y][z].items.length; a++) {
                                                _this.timeLinesList[x].items.push(result[y][z].items[a]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        console.log(_this.timeLinesList);
                        for (var y = 0; y < _this.timeLinesList.length; y++) {
                            if (_this.timeLinesList[y].items.length > 1)
                                _this.timeLinesList[y].availableThreadsCountText = _this.timeLinesList[y].items.length.toString() + " Notes Available";
                            else
                                _this.timeLinesList[y].availableThreadsCountText = _this.timeLinesList[y].items.length.toString() + " Note Available";
                        }
                        if (_this.timeLineRequest.pageNo < _this.totalPages) {
                            _this.timeLineRequest.pageNo = _this.timeLineRequest.pageNo + 1;
                            _this.isLoading = false;
                        }
                        else {
                            _this.loadingLabelHide = true;
                        }
                        if (_this.timeLinesList.length > 0)
                            _this.showlabel = false;
                        else
                            _this.showlabel = true;
                        console.log(_this.timelines);
                        console.log(_this.filteredTimelines);
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                        _this.isLoading = false;
                    }, function () { return function () {
                        console.log("Done");
                        _this.isLoading = false;
                    }; });
                };
                TimeLineComponent.prototype.setCurrentNote = function (selected_note) {
                    this.note_id = selected_note.id;
                };
                TimeLineComponent.prototype.onSelectedUsersChanged = function (_users) {
                    this.users = _users.map(function (d) { return d['userName']; });
                };
                TimeLineComponent.prototype.shareNote = function () {
                    var note_share = {
                        Note: this.note_id,
                        AppUsers: this.users
                    };
                    var noteShareResponse;
                    this._noteService.share(note_share).subscribe(function (res) { return noteShareResponse = res; });
                };
                TimeLineComponent.prototype.toggleOpenEditNote = function (event, note) {
                    this.selectedId = note.id;
                    this.selectedNote = note;
                    console.log(note);
                    event.preventDefault();
                    this.isEditNoteOpen = !this.isEditNoteOpen;
                };
                TimeLineComponent.prototype.toggleOpenEditNoteWithoutEvent = function (note) {
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
                };
                Object.defineProperty(TimeLineComponent.prototype, "isEditNoteOpen", {
                    get: function () { return this._isOpen; },
                    set: function (value) {
                        this._isOpen = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TimeLineComponent.prototype, "selectedId", {
                    get: function () { return this._selectedId; },
                    set: function (value) {
                        this._selectedId = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                TimeLineComponent = __decorate([
                    core_1.Component({
                        selector: 'timeline',
                        templateUrl: './app/timeline/timeline.component.html',
                        providers: [
                            timeline_service_1.TimeLineService, notes_service_1.NotesService, user_profile_service_1.UserProfileService
                        ],
                        directives: [tags_selector_component_1.TagsSelectorComponent, timelinegroup_component_1.TimelineInfo, timelinegroup_component_1.TimelineGroup, timelinedetail_component_1.TimelineDetail, timelinedetail_component_1.TimelineDetailGroup, angular2_infinite_scroll_1.InfiniteScroll, modaldialog_1.MODAL_DIRECTIVES, sharetimeline_component_1.ShareTimelineComponent, users_selector_component_1.UsersSelectorComponent, edit_note_component_1.EditNoteComponent]
                    }), 
                    __metadata('design:paramtypes', [timeline_service_1.TimeLineService, notes_service_1.NotesService, user_profile_service_1.UserProfileService, router_2.RouteSegment, router_1.Router, passtag_service_1.PassTagService, app_constants_1.Configuration, core_1.NgZone])
                ], TimeLineComponent);
                return TimeLineComponent;
            }());
            exports_1("TimeLineComponent", TimeLineComponent);
        }
    }
});
//# sourceMappingURL=timeline.component.js.map