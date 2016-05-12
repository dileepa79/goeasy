export class WhatIsGoingOnResponse {
    constructor(public title: string, public description: string, public userImage: string, public timeLineId: Number, public tags: WhatIsGoingOnTag[]) {
    }
}

export class WhatIsGoingOnTag {
    constructor(public id: number, public name: string)
    { }
}