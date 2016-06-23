System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NoteRequest;
    return {
        setters:[],
        execute: function() {
            NoteRequest = (function () {
                function NoteRequest(title, description, tags, users, filesToUpload, attachments) {
                    this.title = title;
                    this.description = description;
                    this.tags = tags;
                    this.users = users;
                    this.filesToUpload = filesToUpload;
                    this.attachments = attachments;
                }
                return NoteRequest;
            }());
            exports_1("NoteRequest", NoteRequest);
        }
    }
});
//# sourceMappingURL=note-request.js.map