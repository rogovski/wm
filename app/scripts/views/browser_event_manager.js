/*global wmJs, Backbone, JST*/

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    wmJs.Views.BrowserEventManagerView = Backbone.View.extend({

        template: JST['app/scripts/templates/browser_event_manager.ejs'],

        el: window,

        events: {
        	'keydown' : 'keydownHandler',
            'keyup' : 'keyupHandler',
        	'click' : 'windowClickHandler'
        },

        modalShowHandled: null,

        isWindowInFocus: null,

        initialize: function () {
        	this.modalShowHandled = false;
            this.isWindowInFocus  = false;
            $('body').append(this.template);
        },

        keydownHandler: function (e) {
            if(!this.isWindowInFocus) return;

            if(e.keyCode == 87 && !this.modalShowHandled) { // w was pressed
                this.modalShowHandled = true;
                $('.workspace-selector-modal').modal('show');
            } else if (e.keyCode == 37) {// left

            
            } else if (e.keyCode == 39) {// right

            
            } else if (e.keyCode == 38) {// up

            
            } else if (e.keyCode == 39) { // down

            
            } else {}
        	console.log(e);
        },

        keyupHandler: function (e) {
            if(!this.isWindowInFocus) return;

            if(e.keyCode == 87 && this.modalShowHandled) { // w was pressed
                this.modalShowHandled = false;
                $('.workspace-selector-modal').modal('hide');
            } else if (e.keyCode == 37) {// left

            
            } else if (e.keyCode == 39) {// right

            
            } else if (e.keyCode == 38) {// up

            
            } else if (e.keyCode == 39) {// down

            
            } else {}
            console.log(e);            
        },

        windowClickHandler: function (e) {
        	if(!$(e.target).hasClass('app-top')) {
                this.isWindowInFocus = false;
        		console.log('window lost focus');
        	}
        	else {
                this.isWindowInFocus = true;
                $.publish(wmJs.Data.Topics.appInstanceFocusChanged, {sender: 'window'});
        		console.log('window in focus');
        	}
        	
        }

    });

})();
