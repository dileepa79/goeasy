System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RecentTimeLineResponse, AppUser, RecentTimelineTag;
    return {
        setters:[],
        execute: function() {
            RecentTimeLineResponse = (function () {
                function RecentTimeLineResponse(id, userId, requestedTime, date, tags, isWatched, recentActivity, noOfEntries, dateDay, dateMonth) {
                    this.id = id;
                    this.userId = userId;
                    this.requestedTime = requestedTime;
                    this.date = date;
                    this.tags = tags;
                    this.isWatched = isWatched;
                    this.recentActivity = recentActivity;
                    this.noOfEntries = noOfEntries;
                    this.dateDay = dateDay;
                    this.dateMonth = dateMonth;
                }
                return RecentTimeLineResponse;
            }());
            exports_1("RecentTimeLineResponse", RecentTimeLineResponse);
            AppUser = (function () {
                function AppUser(userId, userName, imageUrl) {
                    this.userId = userId;
                    this.userName = userName;
                    this.imageUrl = imageUrl;
                }
                return AppUser;
            }());
            exports_1("AppUser", AppUser);
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