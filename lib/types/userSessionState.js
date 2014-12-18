var _        = require('underscore'),
    Backbone = require('backbone');

/**
 * a single user, a list of that user's sessions, and
 * the user's active session (if any)
 **/
var _UserSessionState = Backbone.Model.extend({
    defaults: {
        user    : null,
        sessions: null // new _SessionCollection()
    }
});
exports.UserSessionState = _UserSessionState;