/*global wmJs, Backbone, JST*/

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    wmJs.Views.WindowExampleLoggerView = wmJs.ApplicationWindowView.extend({

        template: JST['app/scripts/templates/window_example_logger.ejs'],

        window_render: function () {
        	this.$windowcontent.html(this.template());
        }

    });

    WM.WindowedApplicationFactory
      .registerApplication('window_logger', 'logger', '*',
      					   wmJs.Views.WindowExampleLoggerView);
})();