export class TagsResponse {
    data: Tag[]
}

export class Tag {
    id: number;
    name: string;
}

export class TagIdentity {
    id: number;
    name: string;
	description: string;
	lat: string;
	long: string;
	location: string;
	web: string;
	bizCategory: string;
	noOfEmployees: string;
	annualRevenue: string;
    createdBy: string;
    createdDate: string;
}
