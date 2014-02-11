/*global wm, Backbone, JST*/

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    wmJs.Views.WindowExampleFormView = wmJs.ApplicationWindowView.extend({

        template: JST['app/scripts/templates/window_example_form.ejs'],

        window_events: {
            'keydown' : 'keydownHandler'
        },

        window_render: function () {
        	this.$windowcontent.html(this.template());
        },

        keydownHandler: function (e) {
            var v = $(e.target).val();
            $.publish(wmJs.Data.Topics.logMessage, {msg: v});
        }

    });

    wmJs.Factories.WindowedApplicationFactory
      .registerApplication('window_form', 'input form', '*',
      					   wmJs.Views.WindowExampleFormView);
})();