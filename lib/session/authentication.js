// NOTE: all backend objects return RAW json
// all the modules in this ('session') folder
// are responsible for constructing User/Session/Authentication
// Backbone models out of the raw json data

var _                        = require('underscore'),
    $                        = require('jquery'),
    AuthenticationResult     = require('../types/authenticationResult.js'),
    User                     = require('../types/user.js'),
    UserCreateForm           = require('../types/userCreateForm.js'),
    UserCreateLogin          = require('../types/userLoginForm.js'),
    UserCreatePendingConfirm = require('../types/userCreatePendingConfirm.js');


// attempt to create a new user with the specified backend
function _createNewUser( userCreateForm, backend ) {

    backend.createNewUser(userCreateForm.toJSON(), {

        success: function ( response ) {
            // if( !backend.IsAuthenticationManagerBackendResult(response) ) .. throw error ..

            var pendingUser = UserCreatePendingConfirm.emptyUserCreatePendingConfirm();

            pendingUser.set( response.result );

            $.publish( 'created.usercreate.authentication.manager',
                AuthenticationResult.NewSuccessResult( pendingUser ) );
        },

        error: function ( response ) {
            // if( !backend.IsAuthenticationManagerBackendResult(response) ) .. throw error ..

            $.publish( 'failed.usercreate.authentication.manager',
                AuthenticationResult.NewErrorResult( response.errors, userCreateForm ) );
        }

    });

}
exports.createNewUser = _createNewUser;

// attempt to log in a user with the specified backend
function _loginUser( userLoginForm, backend ) {

    backend.loginUser( userLoginForm.toJSON(), {

        success: function ( response ) {
            // if( !backend.IsAuthenticationManagerBackendResult(response) ) .. throw error ..

            var authuser = User.emptyUser();

            authuser.set( response.result );

            $.publish( 'success.userlogin.authentication.manager',
                AuthenticationResult.NewSuccessResult( authuser ) );
        },

        error: function ( response ) {
            // if( !backend.IsAuthenticationManagerBackendResult(response) ) .. throw error ..

            $.publish( 'failed.userlogin.authentication.manager',
                AuthenticationResult.NewErrorResult( response.errors, userLoginForm ) );
        }
    });
}
exports.loginUser = _loginUser;