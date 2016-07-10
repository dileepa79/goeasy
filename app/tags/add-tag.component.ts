import { Component, OnInit} from '@angular/core';
import { RouteSegment, CanDeactivate} from '@angular/router'
import { Router} from '@angular/router';
import { TagsService } from '../services/tags.service';
import { TagIdentityService} from '../services/tag.identity.service';
import { TagIdentity ,Tag } from './tags-response';

@Component({
    selector: 'new-tag',
    templateUrl: './app/tags/add-tag.component.html',
    providers: [
		TagsService ,
        TagIdentityService 
    ]
})

export class TagIdentityComponent implements OnInit {
	constructor(private _router: Router ,private routeSegment: RouteSegment,private _tagIdentityService: TagIdentityService,private _tagsService: TagsService){}
			
    public tagIdentityRequest: TagIdentity = {
        id: 0,
        name: '',
		description: '',
		lat: '',
		long: '',
		location: '',
		web: '',
		bizCategory: '',
		noOfEmployees: '',
		annualRevenue: '',
		createdBy: '',
		createdDate: ''
    };
	
	heading = "TAG EDITOR";
	active = true;
	
	tag: Tag;
	name = "";
	title = "";
	description = "";
	lat = "";
	long = "";
	location = "";
	web = "";
	bizCategory = "";
	noOfEmployees = "";
	annualRevenue = "";
	
	ngOnInit() {
		if(this.routeSegment){
			console.log( ' tag id ' + id);
			let id = this.routeSegment.getParam('id');
		
			this._tagIdentityService.GetById(id).subscribe(t => {
				console.log(JSON.stringify(t));
				//this.tagIdentityRequest.id = t.id;
				this.description = t.description; 
				this.lat = t.lat; 
				this.long = t.long;
				this.location = t.location;
				this.web = t.web;
				this.bizCategory = t.bizCategory;
				this.noOfEmployees = t.noOfEmployees;
				this.annualRevenue = t.annualRevenue;
				this.name =	t.name;
			},
			error => {
				
			},
			() => () => console.log("Done"));
			
			this._tagsService.getAllTags()
				.subscribe(t => {
					this.tag = t.data.filter(t => t.id === +id)[0];
					this.tagIdentityRequest.id = this.tag.id;
					this.tagIdentityRequest.name = this.tag.name;
					this.name =	this.tag.name;
					console.log(this.errorMessage);
				},
				error => {
					console.log(this.tag);
				},
				() => () => console.log("Done"));	

				
			}
			this.active = true;
	}
	
	save(){
		this.tagIdentityRequest.id = this.tag.id;
		this.tagIdentityRequest.name = this.tag.name;
		this.tagIdentityRequest.description = this.description;
		this.tagIdentityRequest.lat = this.lat;
		this.tagIdentityRequest.long = this.long;
		this.tagIdentityRequest.location = this.location;
		this.tagIdentityRequest.web = this.web;
		this.tagIdentityRequest.bizCategory = this.bizCategory;
		this.tagIdentityRequest.noOfEmployees = this.noOfEmployees;
		this.tagIdentityRequest.annualRevenue = this.annualRevenue;
		
		this._tagIdentityService.addTag(this.tagIdentityRequest)
		.subscribe(tag => {
				console.log('Tag Saved');
            },
            error => {
				console.log('error when saving');
            },
            () => () => {
                console.log("Done");
            });
	}

}