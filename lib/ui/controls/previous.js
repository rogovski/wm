var $              = require('jquery'),
    _              = require('underscore'),
    Backbone       = require('backbone'),
    prompt         = require('./prompt.js');


var _PreviousView = function (options) {
    this.onPrevious = options.onPrevious;

    this.onPreviousOptions = _.isUndefined(options.options) ? {} : options.options;

    Backbone.View.apply(this, [options]);
};


_.extend(_PreviousView.prototype, prompt.PromptView.prototype, {

    baseTemplate: JST['controls/previous.html'],

    previous_events_base: {
        "click .btn-previous" : "btnPreviousHandler"
    },

    render_previous_with: function (tmpl) {
        this.render_prompt_with(this.baseTemplate());

        this.$el.find('.control-previous-content-container').html(tmpl);
    },

    events_prompt: function () {
        return _.extend( {}, this.previous_events_base, this.previous_events );
    },

    btnPreviousHandler: function (e) {
        $.publish(this.onPrevious, this.onPreviousOptions);

        e.preventDefault();
        return false;
    }

});

_PreviousView.extend = prompt.PromptView.extend;
exports.PreviousView = _PreviousView;

