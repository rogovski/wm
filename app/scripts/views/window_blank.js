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

    WM.WindowedApplicationFactory
      .registerApplication('blank_window',
      					   wmJs.Views.WindowBlankView);
})();
