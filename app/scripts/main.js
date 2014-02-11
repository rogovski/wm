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

        /*
        var wm = new wmJs.Views.ApplicationManagerView({
            appDataSource:      window.Stubs.testData3(),
            appFactory:         wmJs.Factories.WindowedApplicationFactory,
            appMessages:        wmJs.Data.Topics, 
            el: '#app'
        });
        */
        var wm = new wmJs.Views.ApplicationManagerView({
            appDataSource:      new wmJs.Persistence.LocalStoragePersist(),
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
