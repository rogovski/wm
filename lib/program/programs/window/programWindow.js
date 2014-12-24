/**
 * a box centered on the screen. serves as a base class for all
 * prompts. see 'prompt' sub directory
 **/

var $              = require('jquery'),
    _              = require('underscore'),
    Backbone       = require('backbone');


var _ProgramWindowView = function () {

    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;

    Backbone.View.apply(this, [options]);
};


_.extend(_ProgramWindowView.prototype, Backbone.View.prototype, {

    attributes: {
        class: 'program-window'
    },

    events_window_base: { },

    baseWindowTemplate: JST['program/window/programWindow.html'],

    events: function () {

        return _.extend( {}, this.events_window_base, this.events_window );
    },

    render_window_with: function (tmpl) {
        this.$el.css('height', this.height).css('width', this.width);

        this.$el.html( this.baseWindowTemplate() );

        this.$el.find('.program-window-content-container').html(tmpl);

    },

    setWindowState: function (options) {

        return this;
    },

    setProcessInfo: function (info) {

        return this;
    };

    applyWindowState: function () {
        this.$el.css('height', this.height)
                .css('width', this.width)
                .css('left', this.left)
                .css('top', this.top);

        return this;
    },

    setModel: function (mdl) {
        this.model = mdl;
        return this;
    },

    center: function () {

        var left = (window.innerWidth / 2) - (this.$el.width() / 2);

        var top = (window.innerHeight / 2) - (this.$el.height() / 2);

        this.$el.css('left', left).css('top',top);
    },

    hide: function (args) {
        var fn = void 0;

        if(!_.isUndefined(args) && !_.isUndefined(args.onHidden))
            fn = args.onHidden;

        this.$el.stop().hide('fade', 400, fn);
    },

    show: function (args) {
        var fn = void 0;

        if(!_.isUndefined(args) && !_.isUndefined(args.onHidden))
            fn = args.onHidden;

        this.$el.stop().show('fade', 400, fn);
    }

});


_ProgramWindowView.extend = Backbone.View.extend;
exports.PromptView = _ProgramWindowView;
