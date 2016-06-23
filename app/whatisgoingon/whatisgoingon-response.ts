export class WhatIsGoingOnResponse {
    constructor(public title: string,
        public description: string,
        public userImage: string,
        public timeLineId: Number,
        public tags: WhatIsGoingOnTag[],
        public date: string,
        public time: string,
        public dateFormat: string,
        public totalPages:number) {
    }
}

export class WhatIsGoingOnTag {
    constructor(public id: number, public name: string)
    { }
}