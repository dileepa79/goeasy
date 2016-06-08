import {Injectable} from '@angular/core';

@Injectable()
export class PassTagService {
    private _selectedTags: string='';
    public getTags() {
        return this._selectedTags;
    }
    public setTags(tags: string) {
        this._selectedTags = tags;
    }
}