/*global wmJs, Backbone, JST*/

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    wmJs.Views.WindowExampleMapDisplayView = wmJs.ApplicationWindowView.extend({

        template: JST['app/scripts/templates/window_example_map_display.ejs'],

        map: null,

        directionsDisplay: null,

        directionsService: null,
        origin: null,

        initialize: function () {
          this.origin = new google.maps.LatLng(41.5759, -73.4108)
          this.directionsService = new google.maps.DirectionsService();
        },

        window_render: function () {
        	this.$windowcontent.html(this.template());

          this.directionsDisplay = new google.maps.DirectionsRenderer();

  			  this.map = new google.maps.Map(document.getElementById('map-canvas'), {
                zoom: 15,
                center: this.origin
          });
          this.placeMarker(this.origin, this.map);
          
          this.directionsDisplay.setMap(this.map);

          var self = this;
          google.maps.event.addListener(this.map, 'click', function(e) {
            //console.log(e.latLng);
            //console.log(e);
            self.placeMarker(e.latLng, self.map);
            self.calcRoute(self.origin, e.latLng);
            $.publish(wmJs.Data.Topics.logMessage, {msg: 'directions requested'});
          });          
        },

        placeMarker: function(position, map) {
          var marker = new google.maps.Marker({
            position: position,
            map: this.map
          });
          map.panTo(position);
        },

        calcRoute: function (origin, destination) {
          var request = {
              origin: origin,
              destination: destination,
              // Note that Javascript allows us to access the constant
              // using square brackets and a string value as its
              // "property."
              travelMode: google.maps.TravelMode['DRIVING']
          },
          self = this;

          self.directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              self.directionsDisplay.setDirections(response);
            }
          });
        }


    });

    wmJs.Factories.WindowedApplicationFactory
      .registerApplication('window_map_display', 'map display', '*',
      					   wmJs.Views.WindowExampleMapDisplayView);

})();
