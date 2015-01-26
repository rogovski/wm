var $              = require('jquery'),
    _              = require('underscore'),
    Backbone       = require('backbone'),
    prompt         = require('../controls/prompt.js');


var _Spinner = prompt.PromptView.extend({

    template: JST['ui/prompts/spinner.html'],

    events_prompt: {
    },

    message: null,

    render: function () {
        this.render_prompt_with(this.template());

        this.center();

        this.delegateEvents();
    },

    setMessage: function (msg) {
        this.message = msg;
        return this;
    },

    /**
     * useful when the spinner is already running
     * and the only thing we want to change is the message
     **/
    renderMessageOnly: function () {
        this.$el.find('.spinner-message').html(this.message);
        return this;
    },

    // override the hide and show messages
    // in order to stop the spinner

    hide: function (args) {
        var fn = void 0;
        if(_.has(args, 'onHidden'))
            fn = args.onHidden;

        this.$el.find('.spinner-container').spin(false);
        this.$el.hide('fade', 400, fn);
    },

    show: function (args) {
        var fn = void 0;
        if(_.has(args, 'onShow'))
            fn = args.onShow;

        this.$el.find('.spinner-message').html(this.message);
        this.$el.find('.spinner-container').spin({ top: '40%' });
        this.$el.show('fade', 400, fn);
    }

});


function _create ( options ) {
    return new _Spinner( options );
}
exports.create = _create