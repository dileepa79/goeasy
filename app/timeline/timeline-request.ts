import { Tag } from '../tags/tags-response';

export class TimeLineRequest {
    data: Tag[];
    isPersistedSearch: boolean;
}