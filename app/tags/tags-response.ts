export class TagsResponse {
    data: Tag[]
}

export class Tag {
    id: number;
    name: string;
    createdBy: string;
    createdDate: string;
}
