/*global wmJs, $*/


window.wmJs = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    Factories: {},
    Persistence: {},
    Data: {},
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
