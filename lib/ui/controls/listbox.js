var $                = require('jquery'),
    _                = require('underscore'),
    Backbone         = require('backbone'),
    ListItem         = require('./listboxItem.js');

var _Listbox = Backbone.View.extend({

    template: JST['ui/controls/listbox.html'],

    attributes: {
        class: 'control-listbox-element'
    },

    events: {
        'listbox-item-selected': 'handleListboxItemSelect',
        'listbox-item-deselected': 'handleListboxItemDeselect'
    },

    items: null,

    multiSelect: true,

    selectedViews: [],

    initialize: function ( options ) {
        if(!_.isUndefined( options )) {
            this.multiSelect = _.isUndefined(options.multiSelect)
                                    ? true : options.multiSelect;
        }
    },

    render: function () {
        this.$el.html(this.template());

        var self = this;

        // cache list items
        if(_.isNull(this.items)) {
            self.items = [];

            _.each(this.model.get('sessions').models, function (e,i) {
                self.items.push( ListItem.create( {
                    model: e,
                    parentview: self.$el
                } ) );
            });
        }

        var $ul = this.$el.find('.control-listbox-container');

        _.each( this.items, function (e,i) {
            $ul.append(e.el);
            e.render();
        } );

        this.$el.perfectScrollbar();
    },

    handleListboxItemSelect: function (e,args) {
        if(!this.multiSelect) {
            _.each(this.items, function (v) {
                if(v.cid != args.cid) v.deselect();
            });
            this.selectedViews = [];
        }
        this.selectedViews.push( args.cid );
    },

    handleListboxItemDeselect: function (e,args) {
        var newSelectedItems = _.reject(this.selectedViews, function (cid) {
            return args.cid == cid;
        });
        this.selectedViews = newSelectedItems;
    },

    getSelectedItems: function () {
        var modelList = [], self = this;
        _.each(this.items, function (v) {
            if(_.contains(self.selectedViews, v.cid)) modelList.push(v.model);
        });

        return modelList;
    }

});


function _create( options ) {
    return new _Listbox( options );
}
exports.create = _create;