

var $              = require('jquery'),
    _              = require('underscore'),
    Backbone       = require('backbone');


var _WindowView = function (options) {
    // todo throw ex if window state notdef
    //               if sid not def
    //               if pid not def

    Backbone.View.apply(this, [options]);

    var self = this;
    this.$el.on('resize', function () {
        self.resizeContent();
    })
};


_.extend(_WindowView.prototype, Backbone.View.prototype, {

    attributes: {
        class: 'program-window'
    },

    events_window_base: { },

    baseWindowTemplate: JST['program/handle/window.html'],

    events: function () {

        return _.extend( {}, this.events_window_base, this.events_window );
    },

    render_window_with: function (tmpl) {
        this.$el.css('height', this.height).css('width', this.width);

        this.$el.html( this.baseWindowTemplate() );

        this.$el.find('.program-window-content-container').html(tmpl);

        this.$el.draggable().resizable();

        this.$el.find('.ui-resizable-se').html('<i class="fa fa-sort-desc fa-1x"></i>');

        this.resizeContent();

    },

    setWindowState: function (options) {
        this.width  = options.get('width');
        this.height = options.get('height');
        this.left   = options.get('left');
        this.top    = options.get('top');

        return this;
    },

    setProcessInfo: function (info) {
        this.sid        = info.sid;
        this.parentPid  = info.parentPid;
        this.pid        = info.pid;

        return this;
    },

    applyWindowState: function () {
        this.$el.css('height', this.height)
                .css('width', this.width)
                .css('left', this.left)
                .css('top', this.top);

        return this;
    },

    // generate subscription signals, subscribe to stuff
    applyProcessInfo: function () {

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

    resizeContent: function () {
        this.$el.find('.program-window-content-container')
                .width(this.$el.width())
                .height(this.$el.height() - 30);

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


_WindowView.extend = Backbone.View.extend;
exports.PromptView = _WindowView;

exports.WindowView = _WindowView;
