/*global wmJs, Backbone, JST*/

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    wmJs.Views.WindowExampleLoggerView = wmJs.ApplicationWindowView.extend({

        template: JST['app/scripts/templates/window_example_logger.ejs'],

        window_events: {
            'click .btn1' : 'c1h',
            'click .btn2' : 'c2h',
        },

        window_render: function () {
        	this.$windowcontent.html(this.template());
        },

        c1h: function () {
            console.log('zxc');
        },

        c2h: function () {
            console.log("window page_Offset -> X: " + window.pageXOffset+" | Y: " + window.pageYOffset );
            console.log('windowcontainer top/left -> top: ', this.$windowcontainer.css('top'), ' | left: ', this.$windowcontainer.css('left'));
            console.log("windowcontainer offset -> top: " + this.$windowcontainer.offset().top+" | left: " + this.$windowcontainer.offset().left );
        
        }

    });

    wmJs.Factories.WindowedApplicationFactory
      .registerApplication('window_logger', 'logger', '*',
      					   wmJs.Views.WindowExampleLoggerView);
})();