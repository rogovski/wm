var $                = require('jquery'),
    _                = require('underscore'),
    Backbone         = require('backbone'),
    listbox          = require('../controls/listbox.js'),
    previous         = require('../controls/previous.js'),
    userSessionState = require('../../types/userSessionState.js');


var _SessionRestore = previous.PreviousView.extend({

    sessionList: null,

    template: JST['prompts/sessionRestore.html'],

    previous_events: {
        'click .user-session-restore-submit': 'handleUserSessionRestoreSubmit'
    },

    initialize: function () {
        this.model = userSessionState.emptyUserSessionState();
    },

    render: function () {
        this.render_previous_with(this.template());

        this.center();

        this.delegateEvents();
    },

    setPromptOptions: function ( options ) {

        if(_.isUndefined( options )) return;

        if(_.isUndefined( options.model )) return;

        this.model.set( options.model.attributes );
        this.loadView();
    },

    handleUserSessionRestoreSubmit: function () {

        this.loadModel();
    },

    displayInvalid: function (validationResult) {
        console.log(validationResult);
    },

    /**
     * cycle through all input elements,
     * loading them into the model. assumes
     * input 'name' attribute is the same a
     * model attribute name
     **/
    loadModel: function () {
        var self = this;


    },


    /**
     * load input elements from model values
     **/
    loadView: function () {
        var self = this;

        if(_.isNull(this.sessionList))
            this.sessionList = listbox.create({ model: this.model });

        this.$el.find('.user-session-list-container').html(this.sessionList.el);

        this.sessionList.render();
    }

});


function _create ( options ) {
    return new _SessionRestore( options );
}
exports.create = _create