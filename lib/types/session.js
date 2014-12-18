var _        = require('underscore'),
    Backbone = require('backbone');

/**
 * a single session of a single user
 **/
var _Session = Backbone.Model.extend({
    defaults: {
        sid        : null,
        display    : null,
        procManager: null
    }
});
exports.Session = _Session;
