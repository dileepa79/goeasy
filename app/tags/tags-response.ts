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
    type: string;
    subType: string;
    address: string;
	lat: string;
	long: string;
	location: string;
	web: string;
	bizCategory: string;
	noOfEmployees: string;
    annualRevenue: string;
    title: string;
    mobile: string;
    workPhone: string;
    email: string;
    twitter: string;
    linkedIn: string;
    company: string;
    im: string;
    blog: string;
    birthDate: string;
    expNoOfYears: string;
    currentCompany: string;
    noticePeriod: string;
    appliedPosition: string;
    highestQualification: string;
    expectedSalary: string;
    planToMigrate: string;
    expiryDate: string;
    expiryStatus: string;
    createdBy: string;
    createdDate: string;
    tag: Tag; 
}
