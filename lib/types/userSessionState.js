var _        = require('underscore'),
    Backbone = require('backbone'),
    SessionCollection = require('./sessionCollection.js');

/**
 * a single user, a list of that user's sessions, and
 * the user's active session (if any)
 **/
var _UserSessionState = Backbone.Model.extend({
    defaults: {
        user            : null,
        sessions        : new SessionCollection.SessionCollection(),
        activeSessionIdx: null
    }
});
exports.UserSessionState = _UserSessionState;


function _emptyUserSessionState() {
    return new _UserSessionState();
}
exports.emptyUserSessionState = _emptyUserSessionState;