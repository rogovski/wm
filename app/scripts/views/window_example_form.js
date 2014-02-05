/*global wm, Backbone, JST*/

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    wmJs.Views.WindowExampleFormView = wmJs.ApplicationWindowView.extend({

        template: JST['app/scripts/templates/window_example_form.ejs'],

        window_render: function () {
        	this.$windowcontent.html(this.template());
        }

    });

    WM.WindowedApplicationFactory
      .registerApplication('window_form', 'input form',
      					   wmJs.Views.WindowExampleFormView);
})();