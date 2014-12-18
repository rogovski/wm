var _        = require('underscore'),
    Backbone = require('backbone');


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
exports.UserCreateForm = _UserCreateForm;

function _emptyUserCreateForm() {
    return new _UserCreateForm();
}
exports.emptyUserCreateForm = _emptyUserCreateForm;