import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {RecentTimeLineResponse} from '../recenttimeline/recenttimeline-response';
@Pipe({
    name: 'recentTimelineWatchFilter'
})
@Injectable()
export class RecentTimelineWatchFilter implements PipeTransform {
    transform(recentTimelines: RecentTimeLineResponse[], args: boolean): any {
        if (recentTimelines == null) {
            return null;
        }
        if (args == false) {
            return recentTimelines;
        }
        return recentTimelines.filter(tl => tl.isWatched == args);
        
   }
}