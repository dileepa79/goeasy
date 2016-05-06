System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RecentTimeLineResponse, RecentTimelineTag;
    return {
        setters:[],
        execute: function() {
            RecentTimeLineResponse = (function () {
                function RecentTimeLineResponse(id, userId, requestedTime, date, tags, isWatched) {
                    this.id = id;
                    this.userId = userId;
                    this.requestedTime = requestedTime;
                    this.date = date;
                    this.tags = tags;
                    this.isWatched = isWatched;
                }
                return RecentTimeLineResponse;
            }());
            exports_1("RecentTimeLineResponse", RecentTimeLineResponse);
            RecentTimelineTag = (function () {
                function RecentTimelineTag(id, name) {
                    this.id = id;
                    this.name = name;
                }
                return RecentTimelineTag;
            }());
            exports_1("RecentTimelineTag", RecentTimelineTag);
        }
    }
});
//# sourceMappingURL=recenttimeline-response.js.map