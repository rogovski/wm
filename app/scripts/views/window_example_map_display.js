/*global wmJs, Backbone, JST*/

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    wmJs.Views.WindowExampleMapDisplayView = wmJs.ApplicationWindowView.extend({

        template: JST['app/scripts/templates/window_example_map_display.ejs'],

        initialize: function () {
        	//google.maps.event.addDomListener(window, 'load', this.render);
        },

        window_render: function () {
        	this.$windowcontent.html(this.template());
			var mapOptions = {
				zoom: 8,
				center: new google.maps.LatLng(-34.397, 150.644)
			};
			console.log();
  			var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
        }

    });

    wmJs.Factories.WindowedApplicationFactory
      .registerApplication('window_map_display', 'map display', '*',
      					   wmJs.Views.WindowExampleMapDisplayView);

})();
