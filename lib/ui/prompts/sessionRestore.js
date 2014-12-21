var $                = require('jquery'),
    _                = require('underscore'),
    Backbone         = require('backbone'),
    listbox          = require('../controls/listbox.js'),
    previous         = require('../controls/previous.js'),
    userSessionState = require('../../types/userSessionState.js');


var _SessionRestore = previous.PreviousView.extend({

    sessionList: null,

    template: JST['ui/prompts/sessionRestore.html'],

    previous_events: {
        'click .user-session-restore-submit': 'handleUserSessionRestoreSubmit'
    },

    initialize: function () {
        this.model = userSessionState.emptyUserSessionState();
    },

    render: function () {
        this.render_previous_with(this.template());

        this.delegateEvents();
    },

    setPromptOptions: function ( options ) {

        if(_.isUndefined( options )) return;

        if(_.isUndefined( options.model )) return;

        this.model.set( options.model.attributes );

        this.loadView();

        this.center();
    },

    handleUserSessionRestoreSubmit: function () {
        var selectedModels = this.sessionList.getSelectedItems();

        if(selectedModels.length == 0) {
            // TODO: alert
        }
        else {
            var sessionToActivate = _.first(selectedModels),
                activeIndex       = _.indexOf( this.model.get('sessions').models, sessionToActivate );

            this.model.set('activeSessionIdx', activeIndex);

            $.publish('submit.sessionRestore.client', this.model);
        }
    },

    /**
     * load input elements from model values
     **/
    loadView: function () {
        var self = this;

        if(_.isNull(this.sessionList))
            this.sessionList = listbox.create({
                model: this.model,
                multiSelect: false
            });

        this.$el.find('.user-session-list-container').html(this.sessionList.el);

        this.sessionList.render();
    }

});


function _create ( options ) {
    return new _SessionRestore( options );
}
exports.create = _create