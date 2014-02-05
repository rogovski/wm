/*global wmJs, Backbone, JST*/

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    wmJs.Views.WindowExampleTimerView = wmJs.ApplicationWindowView.extend({

        template: JST['app/scripts/templates/window_example_timer.ejs'],

        window_render: function () {
        	this.$windowcontent.html(this.template());
        }

    });

    WM.WindowedApplicationFactory
      .registerApplication('window_timer', 'timer',
      					   wmJs.Views.WindowExampleTimerView);
})();
