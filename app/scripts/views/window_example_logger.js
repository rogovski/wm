/*global wmJs, Backbone, JST*/

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    wmJs.Views.WindowExampleLoggerView = wmJs.ApplicationWindowView.extend({

        template: JST['app/scripts/templates/window_example_logger.ejs'],

        logMessage: JST['app/scripts/templates/window_example_logger_message.ejs'],

        window_events: {
        },

        initialize: function () {
            $.subscribe(wmJs.Data.Topics.logMessage,
                _.partial(this.handleLogMessage, this));            
        },

        window_render: function () {
        	this.$windowcontent.html(this.template());
            this.$logcontent = this.$windowcontent.find('.log-content');
        },

        c1h: function () {
            console.log('zxc');
        },

        c2h: function () {
            console.log("window page_Offset -> X: " + window.pageXOffset+" | Y: " + window.pageYOffset );
            console.log('windowcontainer top/left -> top: ', this.$windowcontainer.css('top'), ' | left: ', this.$windowcontainer.css('left'));
            console.log("windowcontainer offset -> top: " + this.$windowcontainer.offset().top+" | left: " + this.$windowcontainer.offset().left );
        
        },

        handleLogMessage: function (self, evt, args) {
            self.$logcontent.append(self.logMessage(args));
        }

    });

    wmJs.Factories.WindowedApplicationFactory
      .registerApplication('window_logger', 'logger', '*',
      					   wmJs.Views.WindowExampleLoggerView);
})();