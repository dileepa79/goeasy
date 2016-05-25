export class NoteRequest {
    constructor(public title: string,
        public description: string,
        public tags: string[],
        public users: string[]
    ){}
    
}