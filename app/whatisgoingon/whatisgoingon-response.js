System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WhatIsGoingOnResponse, WhatIsGoingOnTag;
    return {
        setters:[],
        execute: function() {
            WhatIsGoingOnResponse = (function () {
                function WhatIsGoingOnResponse(title, description, userImage, timeLineId, tags) {
                    this.title = title;
                    this.description = description;
                    this.userImage = userImage;
                    this.timeLineId = timeLineId;
                    this.tags = tags;
                }
                return WhatIsGoingOnResponse;
            }());
            exports_1("WhatIsGoingOnResponse", WhatIsGoingOnResponse);
            WhatIsGoingOnTag = (function () {
                function WhatIsGoingOnTag(id, name) {
                    this.id = id;
                    this.name = name;
                }
                return WhatIsGoingOnTag;
            }());
            exports_1("WhatIsGoingOnTag", WhatIsGoingOnTag);
        }
    }
});
//# sourceMappingURL=whatisgoingon-response.js.map