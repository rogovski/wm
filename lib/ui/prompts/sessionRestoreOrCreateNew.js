/**
 * a prompt to allow users to login or create a new user.
 * it is the first stage of the authentication/user creation
 * pipline
 **/


var $              = require('jquery'),
    _              = require('underscore'),
    Backbone       = require('backbone'),
    prompt         = require('../controls/prompt.js');


var _SessionRestoreOrCreateNew = prompt.PromptView.extend({

    template: JST['prompts/sessionRestoreOrCreateNew.html'],

    events_prompt: {
        'click .btn-session-restore': 'handleSessionRestore',
        'click .btn-session-create': 'handleSessionCreate'
    },

    render: function () {
        if(_.isUndefined(this.model) || _.isNull(this.model))
            throw new Error("_SessionRestoreOrCreateNew: userSessionState not initialized");

        this.render_prompt_with(this.template({
            hasExistingSessions: this.model.get('sessions').length > 0
        }));

        this.center();

        this.delegateEvents();
    },

    handleSessionRestore: function (e) {

        $.publish('sessionRestore.client', { model: this.model });

        e.preventDefault();
        return false;
    },

    handleSessionCreate: function (e) {
        $.publish('sessionCreate.client', { model: this.model });

        e.preventDefault();
        return false;
    }

});


function _create ( options ) {
    return new _SessionRestoreOrCreateNew( options );
}
exports.create = _create