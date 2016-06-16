export class TimeLineResponse {
    DateFormat: string;
    Items: TimeLineSingleResponse[];
}

export class TimeLineSingleResponse {
    Id: number;
    CreateDate:Date;
    Title:string;
    Description: string;
    ActivityType: string;
    ImageUrl: string;
    Date: string;
    Tags: any[];
}