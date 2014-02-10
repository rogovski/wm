/*global wmJs, $*/


window.wmJs = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    Factories: {},
    Persistence: {},
    Exception: {},
    Data: {},
    init: function () {
        'use strict';

        var wm = new wmJs.Views.ApplicationManagerView({
            appDataSource:      window.Stubs.testData3(),
            appFactory:         wmJs.Factories.WindowedApplicationFactory,
            appMessages:        wmJs.Data.Topics, 
            el: '#app'
        });
        
        /*
        var wm = new wmJs.Views.ApplicationManagerView(

            window.Stubs.testData() //testData()

        );*/
        wm.render();
    }
};

$(document).ready(function () {
    'use strict';
    wmJs.init();
});
