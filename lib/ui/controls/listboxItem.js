var $                = require('jquery'),
    _                = require('underscore'),
    Backbone         = require('backbone');


var _ListboxItem = Backbone.View.extend({

    tagName: 'li',

    template: JST['controls/listboxItem.html'],

    render: function () {
        this.$el.html(this.template( { display: this.model.get('display') } ) );
    }
});


function _create( options ) {
    return new _ListboxItem( options );
}
exports.create = _create;