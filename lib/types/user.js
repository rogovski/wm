var _        = require('underscore'),
    Backbone = require('backbone');

/**
 * user object used by the majority of the system.
 * populated after the user has been authenticated
 **/
var _User = Backbone.Model.extend({
    defaults: {
        username : null,
        email    : null,
        token    : null
    }
});
exports.User = _User;

function _emptyUser() {
    return new _User();
}
exports.emptyUser = _emptyUser;