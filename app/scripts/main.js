/*global wmJs, $*/


window.wmJs = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        var wm = new wmJs.Views.ApplicationManagerView(

            window.Stubs.testData() //testData()

        );
        wm.render();
    }
};

$(document).ready(function () {
    'use strict';
    wmJs.init();
});
