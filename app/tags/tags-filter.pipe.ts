import { PipeTransform, Pipe } from 'angular2/core';
import { TagsResponse, Tag } from './tags-response';

@Pipe({
    name: 'tagFilter'
})

export class TagFilterPipe implements PipeTransform {
    transform(value: Tag[], args: string[]): Tag[] {
        let filter: string = args[0] ? args[0].toLocaleLowerCase() : null;

        return filter ? value.filter((tag: Tag) =>
            tag.name.toLocaleLowerCase().indexOf(filter) != -1) : value;
    }
}