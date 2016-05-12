export class RecentTimeLineResponse {
    constructor(
        public id: string,
        public userId: string,
        public requestedTime: string,
        public date: string,
        public tags: RecentTimelineTag[],
        public isWatched: boolean,
        public recentActivity: string,
        public noOfEntries: string
    )
    {}
}

export class RecentTimelineTag {
    constructor(public id: number, public name: string)
    { }
}