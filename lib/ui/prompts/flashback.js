var $              = require('jquery'),
    _              = require('underscore'),
    Backbone       = require('backbone'),
    prompt         = require('../controls/prompt.js');


var _Flashback = prompt.PromptView.extend({

    template: JST['ui/prompts/flashback.html'],

    events_prompt: {
        'click .flashback-return-message': 'handleReturnToClick'
    },

    mainMessage: null,

    returnToMessage: null,

    flashbackToSignal: null,

    flashbackToState: null,

    countdown: null,

    hasReturnButton: true,

    timeoutRef: null,

    initialize: function (options) {

        if(!_.isUndefined(options)) {
            this.countdown = _.isUndefined(options.countdown) ? null: options.countdown;
            this.hasReturnButton = _.isUndefined(options.returnButton) ? true: options.returnButton;
        }

    },

    render: function () {
        this.render_prompt_with(this.template({
            hasReturnButton: this.hasReturnButton,
            hasCountdown: _.isNull(this.countdown),
            countdown: this.countdown
        }));

        this.center();

        this.delegateEvents();

        this.go();
    },

    setMainMessage: function (msg) {
        this.mainMessage = msg;
        return this;
    },

    setReturnMessage: function (msg) {
        this.returnToMessage = msg;
        return this;
    },

    flashbackTo: function ( publishSignal ) {
        this.flashbackToSignal = publishSignal;
        return this;
    },

    withState: function ( state ) {
        this.flashbackToState = state;
        return this;
    },

    go: function () {

        if(!_.isNull(this.mainMessage)) {
            this.$el.find('.flashback-message-content').html(this.mainMessage);
        }

        if(!_.isNull(this.returnToMessage)) {
            this.$el.find('.flashback-return-message').html(this.returnToMessage)
        }

        if(!_.isNull(this.countdown)) {
            var self = this;

            this.timeoutRef = setTimeout(function () {
                $.publish(self.flashbackToSignal, self.flashbackToState);
            }, this.countdown * 1000);

        }
    },

    handleReturnToClick: function (e) {

        if(!_.isNull(this.timeoutRef)) {
            clearTimeout(this.timeoutRef);
        }

        $.publish(this.flashbackToSignal, this.flashbackToState);

        e.preventDefault();

        return false;
    }

});


function _create ( options ) {
    return new _Flashback( options );
}
exports.create = _create