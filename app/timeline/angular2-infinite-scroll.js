System.register(['../timeline/infinite-scroll', '../timeline/scroller'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var infinite_scroll_1, scroller_1;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (infinite_scroll_1_1) {
                infinite_scroll_1 = infinite_scroll_1_1;
                exportStar_1(infinite_scroll_1_1);
            },
            function (scroller_1_1) {
                scroller_1 = scroller_1_1;
                exportStar_1(scroller_1_1);
            }],
        execute: function() {
            exports_1("default",{
                directives: [infinite_scroll_1.InfiniteScroll, scroller_1.Scroller]
            });
        }
    }
});
//# sourceMappingURL=angular2-infinite-scroll.js.map