import { Tag } from '../tags/tags-response';

export class TimeLineSearchRequest {
    data: TimeLineTagSearchRequest[];
}

export class TimeLineTagSearchRequest {
    data: Tag[];
}