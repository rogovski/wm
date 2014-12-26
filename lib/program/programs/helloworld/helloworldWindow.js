
var $              = require('jquery'),
    _              = require('underscore'),
    Backbone       = require('backbone'),
    Window         = require('../../handle/window.js');


var _HelloWorldWindow = Window.WindowView.extend({

    template: JST['program/programs/helloworldWindow.html'],

    events_window: {

    },

    render: function () {
        this.render_window_with(this.template());

        this.delegateEvents();
    }

});
exports.HelloWorldWindow = _HelloWorldWindow;