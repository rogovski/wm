var _        = require('underscore'),
    Backbone = require('backbone'),
    Session  = require('./session.js');

/**
 * all sessions of a single user
 **/
var _SessionCollection = Backbone.Collection.extend({
    model: Session.Session
});
exports.SessionCollection = _SessionCollection;