var $                = require('jquery'),
    _                = require('underscore'),
    Backbone         = require('backbone'),
    ListItem         = require('./listboxItem.js');

var _Listbox = Backbone.View.extend({

    items: null,

    template: JST['controls/listbox.html'],

    attributes: {
        class: 'control-listbox-element'
    },

    render: function () {
        this.$el.html(this.template());

        var self = this;

        // cache list items
        if(_.isNull(this.items)) {
            self.items = [];

            _.each(this.model.get('sessions').models, function (e,i) {
                self.items.push( ListItem.create( {model: e} ) );
            });
        }

        var $ul = this.$el.find('.control-listbox-container');

        _.each( this.items, function (e,i) {
            $ul.append(e.el);
            e.render();
        } );
    }
});


function _create( options ) {
    return new _Listbox( options );
}
exports.create = _create;