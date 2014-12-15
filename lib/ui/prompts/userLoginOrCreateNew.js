var $              = require('jquery'),
    _              = require('underscore'),
    Backbone       = require('backbone'),
    prompt         = require('../controls/prompt.js');


var _UserLoginOrCreateNew = prompt.PromptView.extend({

    template: JST['prompts/userLoginOrCreateNew.html'],

    events_prompt: {
        'click .btn-user-login': 'handleUserLogin',
        'click .btn-user-create': 'handleUserCreate'
    },

    render: function () {
        console.log('ul')
        this.render_prompt_with(this.template());

        this.center();

        this.delegateEvents();
    },

    handleUserLogin: function (e) {

        $.publish('client.userLogin');

        e.preventDefault();
        return false;
    },

    handleUserCreate: function (e) {
        $.publish('client.userLogin');

        e.preventDefault();
        return false;
    }

});


function _create ( options ) {
    return new _UserLoginOrCreateNew( options );
}
exports.create = _create