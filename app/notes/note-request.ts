import { Tag } from '../tags/tags-response';

export class NoteRequest {
    constructor(public title: string,
        public description: string,
        public tags: Tag[],
        public users: string[]
    ){}
    
}