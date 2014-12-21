/**
 * a prompt to allow users to login or create a new user.
 * it is the first stage of the authentication/user creation
 * pipline
 **/


var $              = require('jquery'),
    _              = require('underscore'),
    Backbone       = require('backbone'),
    prompt         = require('../controls/prompt.js');


var _UserLoginOrCreateNew = prompt.PromptView.extend({

    template: JST['ui/prompts/userLoginOrCreateNew.html'],

    events_prompt: {
        'click .btn-user-login': 'handleUserLogin',
        'click .btn-user-create': 'handleUserCreate'
    },

    render: function () {
        this.render_prompt_with(this.template());

        this.center();

        this.delegateEvents();
    },

    handleUserLogin: function (e) {

        $.publish('userLogin.client');

        e.preventDefault();
        return false;
    },

    handleUserCreate: function (e) {
        $.publish('userCreate.client');

        e.preventDefault();
        return false;
    }

});


function _create ( options ) {
    return new _UserLoginOrCreateNew( options );
}
exports.create = _create