/*global wmJs, $*/


window.wmJs = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    Factories: {},
    Persistence: {},
    Exception: {},
    CssHooks: {},
    Data: {},
    Util: {},
    init: function () {
        'use strict';

        var keyman = new wmJs.Views.BrowserEventManagerView();

        var wm = new wmJs.Views.ApplicationManagerView({
            appDataSource:      window.Stubs.testData3(),
            appFactory:         wmJs.Factories.WindowedApplicationFactory,
            appMessages:        wmJs.Data.Topics, 
            el: '#app'
        });
       
        wm.render();
    }
};

$(document).ready(function () {
    'use strict';
    wmJs.init();
});
