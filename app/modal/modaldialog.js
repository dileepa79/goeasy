System.register(['./components/modal', './components/modal-header', './components/modal-body', './components/modal-footer', './components/modal-instance'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var modal_1, modal_header_1, modal_body_1, modal_footer_1;
    var MODAL_DIRECTIVES;
    var exportedNames_1 = {
        'MODAL_DIRECTIVES': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (modal_1_1) {
                modal_1 = modal_1_1;
                exportStar_1(modal_1_1);
            },
            function (modal_header_1_1) {
                modal_header_1 = modal_header_1_1;
                exportStar_1(modal_header_1_1);
            },
            function (modal_body_1_1) {
                modal_body_1 = modal_body_1_1;
                exportStar_1(modal_body_1_1);
            },
            function (modal_footer_1_1) {
                modal_footer_1 = modal_footer_1_1;
                exportStar_1(modal_footer_1_1);
            },
            function (modal_instance_1_1) {
                exportStar_1(modal_instance_1_1);
            }],
        execute: function() {
            exports_1("MODAL_DIRECTIVES", MODAL_DIRECTIVES = [
                modal_1.ModalComponent,
                modal_header_1.ModalHeaderComponent,
                modal_body_1.ModalBodyComponent,
                modal_footer_1.ModalFooterComponent
            ]);
        }
    }
});
//# sourceMappingURL=modaldialog.js.map