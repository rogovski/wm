var $              = require('jquery'),
    _              = require('underscore'),
    Backbone       = require('backbone');


var _PromptView = function (options) {

    if(!_.isUndefined(options)) {
        this.width = _.isUndefined(options.width) ? 'auto': options.width;
        this.height = _.isUndefined(options.height) ? 'auto': options.height;
    }

    Backbone.View.apply(this, [options]);

    var self = this;

    // TODO: scratch this cus it sucks. it's causing everything to get rendered twice
    $.subscribe('prompt.hide', function (e,args) {

        if(!self.$el.prop('hidden')) {
            var fn = void 0;
            if(!_.isUndefined(args) && !_.isUndefined(args.onHidden))
                fn = args.onHidden;

            self.$el.stop().hide('fade', 400, fn);
        }

    })
};


_.extend(_PromptView.prototype, Backbone.View.prototype, {

    attributes: {
        class: 'prompt'
    },

    events_prompt_base: {
    },

    events: function () {
        var derivedObj = this.events_prompt;

        if(_.isFunction(this.events_prompt)) derivedObj = this.events_prompt();

        return _.extend( {}, this.events_prompt_base, derivedObj );
    },

    basePromptTemplate: JST['controls/prompt.html'],

    render_prompt_with: function (tmpl) {
        this.$el.css('height', this.height).css('width', this.width);

        this.$el.html( this.basePromptTemplate() );

        this.$el.find('.prompt-content').html(tmpl);

        var self = this;
        $(window).on('resize', function() {
            self.center();
        });

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

_PromptView.extend = Backbone.View.extend;
exports.PromptView = _PromptView;


function _hideAllVisiblePrompts(cb) {
    $.publish('prompt.hide', cb);
}
exports.hideAllVisiblePrompts = _hideAllVisiblePrompts;
