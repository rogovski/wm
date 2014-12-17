// NOTE: all backend objects return RAW json
// all the modules in this ('session') folder
// are responsible for constructing User/Session/Authentication
// Backbone models out of the raw json data

var _    = require('underscore'),
    $    = require('jquery'),
    user = require('./user.js');

// need an AuthResult Object
// the return result of all clients who
// call a authentication manager function
function _AuthenticationManagerResult() {

    this.hasErrors   = false;
    this.errors      = null;
    this.errorState  = null;
    this.result      = null;
}

// create a new authentication manager result
// that represents an error
function NewErrorResult( errors, state ) {
    var res = new _AuthenticationManagerResult();

    res.hasErrors = true;
    res.errors = errors;

    if(!_.isUndefined(state)) res.errorState = state;

    return res;
}

// create a new authentication manager result
// that represents a Success
function NewSuccessResult( result ) {
    var res = new _AuthenticationManagerResult();

    res.result = result;

    return res;
}

// check if a result object is a _AuthenticationManagerResult
// should be used by callers
function _IsAuthenticationManagerResult( result ) {
    if(result instanceof _AuthenticationManagerResult)
        return true;

    return false;
}
exports.IsAuthenticationManagerResult = _IsAuthenticationManagerResult;

// attempt to create a new user with the specified backend
function _createNewUser( userCreateForm, backend ) {

    backend.createNewUser(userCreateForm.toJSON(), {

        success: function ( response ) {
            // if( !backend.IsAuthenticationManagerBackendResult(response) ) .. throw error ..

            var pendingUser = user.emptyUserCreatePendingConfirm();

            pendingUser.set( response.result );

            $.publish( 'created.usercreate.authentication.manager',
                NewSuccessResult( pendingUser ) );
        },

        error: function ( response ) {
            // if( !backend.IsAuthenticationManagerBackendResult(response) ) .. throw error ..

            $.publish( 'failed.usercreate.authentication.manager',
                NewErrorResult( response.errors, userCreateForm ) );
        }

    });

}
exports.createNewUser = _createNewUser;

// attempt to log in a user with the specified backend
function _loginUser( userLoginForm, backend ) {

    backend.loginUser( userLoginForm.toJSON(), {

        success: function ( response ) {
            // if( !backend.IsAuthenticationManagerBackendResult(response) ) .. throw error ..

            var authuser = user.emptyUser();

            authuser.set( response.result );

            $.publish( 'success.userlogin.authentication.manager',
                NewSuccessResult( pendingUser ) );
        },

        error: function ( response ) {
            // if( !backend.IsAuthenticationManagerBackendResult(response) ) .. throw error ..

            $.publish( 'failed.userlogin.authentication.manager',
                NewErrorResult( response.errors, userLoginForm ) );
        }
    });
}
exports.loginUser = _loginUser;