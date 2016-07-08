import { Component, OnInit} from '@angular/core';
import { RouteSegment, CanDeactivate} from '@angular/router'
import { Router} from '@angular/router';
import { TagIdentityService} from '../services/tag.identity.service';
import { TagIdentity } from './tags-response';

@Component({
    selector: 'new-tag',
    templateUrl: './app/tags/add-tag.component.html',
    providers: [
        TagIdentityService
    ]
})

export class TagIdentityComponent implements OnInit {
	constructor(private _router: Router ,private routeSegment: RouteSegment,private _tagIdentityService: TagIdentityService){}
			
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
			//let tagname = this.routeSegment.getParam('id');
			//this.name = id;
		}
		this.active = true;
	}
	
	save(){
		this.tagIdentityRequest.name = this.name;
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