/*global wm, Backbone, JST*/

wm.Views = wm.Views || {};

(function () {
    'use strict';

    wm.Views.WindowExampleLauncherView = Backbone.View.extend({

        template: JST['app/scripts/templates/window_example_launcher.ejs']

    });

})();
