var $              = require('jquery'),
    _              = require('underscore'),
    Backbone       = require('backbone'),
    previous       = require('../controls/previous.js');


var _UserLogin = previous.PreviousView.extend({

    template: JST['prompts/userLogin.html'],

    previous_events: {},

    render: function () {
        this.render_previous_with(this.template());

        this.center();

        this.delegateEvents();
    }

});


function _create ( options ) {
    return new _UserLogin( options );
}
exports.create = _create