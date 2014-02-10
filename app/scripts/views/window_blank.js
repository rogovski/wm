/*global wmJs, Backbone, JST*/

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    wmJs.Views.WindowBlankView = wmJs.ApplicationWindowView.extend({

        template: JST['app/scripts/templates/window_blank.ejs'],

        window_render: function () {
        	this.$windowcontent.html(this.template());
        }

    });

    wmJs.Factories.WindowedApplicationFactory
      .registerApplication('blank_window', 'blank window', '*',
      					   wmJs.Views.WindowBlankView);
})();
