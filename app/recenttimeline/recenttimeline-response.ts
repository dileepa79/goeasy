export class RecentTimeLineResponse {
    DateFormat: string;
    Items: RecentTimeLineSingleResponse[];
}

export class RecentTimeLineSingleResponse {
    Id: number;
    CreateDate:Date;
    Title:string;
    Description: string;
    ActivityType: string;
    ImageUrl: string;
    Date: string;
}