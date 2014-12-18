var _        = require('underscore'),
    Backbone = require('backbone');

/**
 * all sessions of a single user
 **/
var _SessionCollection = Backbone.Collection.extend({
    model: _SessionModel
});
exports.SessionCollection = _SessionCollection;