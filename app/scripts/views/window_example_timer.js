/*global wmJs, Backbone, JST*/

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    wmJs.Views.WindowExampleTimerView = wmJs.ApplicationWindowView.extend({

        template: JST['app/scripts/templates/window_example_timer.ejs'],

        window_render: function () {
        	this.$windowcontent.html(this.template());
            
            var clock = $(window).FlipClock ? 
                        this.$windowcontent.find('.wmjs-flip-clock').FlipClock({
                            clockFace: 'TwentyFourHourClock'
                        }) : null;

        }

    });

    wmJs.Factories.WindowedApplicationFactory
      .registerApplication('window_timer', 'timer', '*',
      					   wmJs.Views.WindowExampleTimerView);
})();
