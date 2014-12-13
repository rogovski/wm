var $        = require('jquery'),
    _        = require('underscore'),
    Backbone = require('backbone');


var _Client = Backbone.View.extend({

    template: JST['client.html'],

    render: function () {
        this.$el.html(this.template());
    }

});
exports.Client = _Client;