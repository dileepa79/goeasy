import { Component, OnInit} from '@angular/core';
import { RouteSegment, CanDeactivate} from '@angular/router'
import { Router} from '@angular/router';
import { TagsService } from '../services/tags.service';
import { TagIdentityService} from '../services/tag.identity.service';
import { TagIdentity ,Tag } from './tags-response';
import {SelectItem} from 'primeng/primeng';

@Component({
    selector: 'new-tag',
    templateUrl: './app/tags/add-tag.component.html',
    providers: [
		TagsService ,
        TagIdentityService 
    ]
})

export class TagIdentityComponent implements OnInit {
    constructor(private _router: Router, private routeSegment: RouteSegment, private _tagIdentityService: TagIdentityService, private _tagsService: TagsService) { }

    public tag1 : Tag = {
        id: 0,
        name: ''
    };

    public tagIdentityRequest: TagIdentity = {
        id: 0,
        name: '',
        description: '',
        type: '',
        address: '',
		lat: '',
		long: '',
		location: '',
		web: '',
		bizCategory: '',
		noOfEmployees: '',
        annualRevenue: '',
        title:'',
        mobile :'',
        workPhone: '',
        email:'',
        twitter: '',
        linkedIn: '',
        company: '',
        im: '',
        blog: '',
        birthDate:'',
		createdBy: '',
        createdDate: '',
        tag: { id:0 , name: '' } 
    };
	
	heading = "TAG EDITOR";
	active = true;
	
	tag: Tag;
	name = "";
	title = "";
    description = "";
    type = "";
    address = "";
	lat = "";
	long = "";
	location = "";
	web = "";
	bizCategory = "";
	noOfEmployees = "";
    annualRevenue = "";
    birthDate = "";
    mobile = "";
    workPhone = "";
    email = "";
    twitter = "";
    linkedIn = "";
    company = "";
    im = "";
    blog = "";

    employeeRanges: SelectItem[] = [];
    bizCategories: SelectItem[] = [];
    tagIdentityTypes = [];
    //employeeRanges = [{ label: 'less than 100', value: 0 }, { label: '100 - 500', value: 1 }, { label: '500 - 1000', value: 2 }, { label: '1000 - 5000', value: 3 }, { label: 'more than 5000', value: 4 }];
    tagIdentityType: string = "Customer";

	ngOnInit() {
		if(this.routeSegment){
			let id = this.routeSegment.getParam('id');
            console.log(' tag id ' + id);
            this.tagIdentityTypes.push('General');
            this.tagIdentityTypes.push('Customer');
            this.tagIdentityTypes.push('Prospect');
            this.tagIdentityTypes.push('Person');
            this.tagIdentityTypes.push('Vacancy');
            this.employeeRanges.push({ label: 'less than 100', value: 'less than 100' });
            this.employeeRanges.push({ label: '100 - 500', value: '100 - 500' });
            this.employeeRanges.push({ label: '500 - 1000', value: '500 - 1000' });
            this.employeeRanges.push({ label: '1000 - 5000', value: '1000 - 5000' });
            this.employeeRanges.push({ label: 'more than 5000', value: 'more than 5000' });
            this.bizCategories.push({ label: 'Logistics', value: 'Logistics' });
            this.bizCategories.push({ label: 'Technology', value: 'Technology' });
            this.bizCategories.push({ label: 'Telecommunications', value: 'Telecommunications' });
            this._tagIdentityService.GetById(id).subscribe(t => {
                if (t) {
                    //console.log(JSON.stringify(t));
                    //this.tagIdentityRequest.id = t.id;
                    this.type = t.type;
                    this.tagIdentityType = t.type;
                    this.description = t.description;
                    this.address = t.address;
                    this.lat = t.lat;
                    this.long = t.long;
                    this.location = t.location;
                    this.web = t.web;
                    this.bizCategory = t.bizCategory;
                    this.noOfEmployees = t.noOfEmployees;
                    this.annualRevenue = t.annualRevenue;
                    this.name = t.name;
                    this.tag = t.tag;
                    this.tagIdentityRequest.id = this.tag.id;
                    this.tagIdentityRequest.name = this.tag.name;
                    this.title = t.title;
                    this.birthDate = t.birthDate;
                    this.name = t.tag.name;
                    this.mobile = t.mobile;
                    this.workPhone = t.workPhone;
                    this.email = t.email;
                    this.twitter = t.twitter;
                    this.linkedIn = t.linkedIn;
                    this.company = t.company;
                    this.im = t.im;
                    this.blog = t.blog;
                }
			},
			error => {
				
			},
			() => () => console.log("Done"));
			
			this._tagsService.getById(id)
                .subscribe(g => {
                    console.log(JSON.stringify(g));
                    this.tag = g;
					this.tagIdentityRequest.id = this.tag.id;
					this.tagIdentityRequest.name = this.tag.name;
					this.name =	this.tag.name;
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
        this.tagIdentityRequest.type = this.tagIdentityType;
        this.tagIdentityRequest.address = this.address;
		this.tagIdentityRequest.lat = this.lat;
		this.tagIdentityRequest.long = this.long;
        this.tagIdentityRequest.location = this.location;
		this.tagIdentityRequest.web = this.web;
		this.tagIdentityRequest.bizCategory = this.bizCategory;
		this.tagIdentityRequest.noOfEmployees = this.noOfEmployees;
        this.tagIdentityRequest.annualRevenue = this.annualRevenue;
        this.tagIdentityRequest.title = this.title;
        this.tagIdentityRequest.birthDate = this.birthDate;
        this.tagIdentityRequest.mobile = this.mobile;
        this.tagIdentityRequest.workPhone = this.workPhone;
        this.tagIdentityRequest.email = this.email;
        this.tagIdentityRequest.twitter = this.twitter;
        this.tagIdentityRequest.linkedIn = this.linkedIn;
        this.tagIdentityRequest.company = this.company;
        this.tagIdentityRequest.im = this.im;
        this.tagIdentityRequest.blog = this.blog;
		
		this._tagIdentityService.addTag(this.tagIdentityRequest)
		.subscribe(tag => {
                console.log('Tag Saved');
                this._router.navigate(['/tags']);
            },
            error => {
				console.log('error when saving');
            },
            () => () => {
                console.log("Done");
            });
	}

}