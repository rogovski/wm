/*global wmJs, Backbone, JST*/

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    wmJs.Views.KeyboardManagerView = Backbone.View.extend({

        template: JST['app/scripts/templates/keyboard_manager.ejs'],

        el: 'body',

        events: {
        	'keypress' : 'keydownHandler',
        	'click' : 'windowClickHandler'
        },

        modalShowHandled: null,

        initialize: function () {
        	this.modalShowHandled = false;	
        },

        keydownHandler: function (e) {
        	console.log(e);
        },

        windowClickHandler: function (e) {
        	console.log($(e.target).prop('tagName'));
        	// WTF CAPS. change to lowercase later
        	if($(e.target).prop('tagName') != 'BODY') {
        		console.log('window lost focus');
        		// set isFocused to false, so keyboard events (like input to a form)
        		// wont be handled
        	}
        	else {
        		console.log('window in focus');
        		// publish('allelemeslosefocus') or something
        	}
        	
        }

    });

})();
