var $        = require('jquery'),
    _        = require('underscore'),
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

function _emptyUser() {
    return new _User();
}
exports.emptyUser = _emptyUser;

/**
 * object that gets populated with values
 * from a 'create new' user form
 **/
var _UserCreateForm = Backbone.Model.extend({
    defaults: {
        username : null,
        password : null,
        passrep  : null,
        email    : null
    },

    validation: {
        username : {
            required: true,
            msg: 'Please enter a Username'
        },
        email: [
            {
                required: true,
                msg: 'Please enter an email address'
            },
            {
                pattern: 'email',
                msg: 'Please enter a valid email'
            }
        ],
        password: [
            {
                required: true,
                msg: "Please enter a password"
            },
            {
                fn: function(value) {
                    if(value != this.get('passrep')) {
                        return 'Passwords must match';
                    }
                }
            }
        ],
        passrep: {
            required: true,
            msg: "Please enter a password again"
        }
    }
});


function _emptyUserCreateForm() {
    return new _UserCreateForm();
}
exports.emptyUserCreateForm = _emptyUserCreateForm;


/**
 * user create validation errors:
 *  invalid email, password missmatch, password length, password invalid chars
 **/


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

function _emptyUserCreatePendingConfirm() {
    return new _UserCreatePendingConfirm();
}
exports.emptyUserCreatePendingConfirm = _emptyUserCreatePendingConfirm;

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

function _emptyUserLoginForm() {
    return new _UserLoginForm();
}
exports.emptyUserLoginForm = _emptyUserLoginForm;