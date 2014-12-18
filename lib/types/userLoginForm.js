var _        = require('underscore'),
    Backbone = require('backbone');

/**
 * object that gets populated with values
 * from a 'login' user form
 **/
var _UserLoginForm = Backbone.Model.extend({
    defaults: {
        username : null,
        password : null
    },

    validation: {
        username : {
            required: true,
            msg: 'Please enter a Username'
        },
        password: {
            required: true,
            msg: "Please enter a password"
        }
    }
});
exports.UserLoginForm = _UserLoginForm;

function _emptyUserLoginForm() {
    return new _UserLoginForm();
}
exports.emptyUserLoginForm = _emptyUserLoginForm;