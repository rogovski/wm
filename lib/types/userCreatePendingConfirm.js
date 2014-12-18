var _        = require('underscore'),
    Backbone = require('backbone');

/**
 * object that represents a created user who has
 * not validated via email
 **/
var _UserCreatePendingConfirm = Backbone.Model.extend({
    defaults: {
        username : null,
        email    : null
    }
});
exports.UserCreatePendingConfirm = _UserCreatePendingConfirm

function _emptyUserCreatePendingConfirm() {
    return new _UserCreatePendingConfirm();
}
exports.emptyUserCreatePendingConfirm = _emptyUserCreatePendingConfirm;