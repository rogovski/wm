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
    this.input       = null;
}

// create a new authentication manager result
// that represents an error
function NewErrorResult( errors, state ) {
    var res = new _AuthenticationManagerResult();

    res.hasErrors = true;
    res.errors = errors;

    if(!_.isUndefined(state)) this.errorState = state;

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

// offload the process of creating a new user to the
// authentication manager. auth manager will in turn
// make the request with a specific options.backend
function _createNewUser( userCreateForm, backend ) {

    backend.createNewUser(userCreateForm.toJSON(), {

        success: function ( response ) {
            // if( !backend.IsAuthenticationManagerBackendResult(response) ) .. throw error ..

            var user = user.emptyUser();

            user.set( response.result );

            $.publish( 'created.usercreate.authentication.manager',
                NewSuccessResult( user ) );
        },

        error: function ( response ) {
            $.publish( 'failed.usercreate.authentication.manager',
                NewErrorResult( response.errors, userCreateForm ) );
        }

    });

}
exports.createNewUser = _createNewUser;