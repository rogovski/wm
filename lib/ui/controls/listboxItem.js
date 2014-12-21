var $                = require('jquery'),
    _                = require('underscore'),
    Backbone         = require('backbone');


var _ListboxItem = Backbone.View.extend({

    tagName: 'li',

    attributes: {
        class: 'base'
    },

    template: JST['ui/controls/listboxItem.html'],

    events: {
        'click': 'handleSelection'
    },

    selected: false,

    initialize: function ( options ) {
        this.$el.hover(this.onMouseOver.bind(this),
                       this.onMouseOut.bind(this));

        if(_.isUndefined(options) || _.isUndefined(options.parentview)) {
            throw new Error('listbox item needs parentview option');
        }

        this.$parentview = options.parentview;
    },

    render: function () {
        this.$el.html(this.template( { display: this.model.get('display') } ) );
    },

    onMouseOver: function (e) {
        this.$el.addClass('hover');
    },

    onMouseOut: function (e) {
        this.$el.removeClass('hover');
    },

    select: function () {
        this.selected = true;
        this.$el.addClass('selected');
    },

    deselect: function () {
        this.selected = false;
        this.$el.removeClass('selected');
    },

    handleSelection: function (e) {
        if(this.selected) {
            this.selected = false;
            this.$el.removeClass('selected');
            this.$parentview.trigger('listbox-item-deselected', {cid: this.cid});
        }
        else {
            this.selected = true;
            this.$el.addClass('selected');
            this.$parentview.trigger('listbox-item-selected', {cid: this.cid});
        }
    }
});


function _create( options ) {
    return new _ListboxItem( options );
}
exports.create = _create;