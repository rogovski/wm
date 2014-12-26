var result       = require('../../../types/authenticationBackendResult.js'),
    pendingUsers = require('../data/pendingUser.js'),
    users        = require('../data/user.js'),
    _            = require('underscore'),
    stub         = require('./stub.js');


/**
 * this method only exists for the memory backend.
 * return all authentication state for debugging purposes
 **/
function _getAuthenticationState() {
    return {
        pending_users: pendingUsers.pending_users,
        users: users.users
    };
}
exports.getAuthenticationState = _getAuthenticationState;


/**
 * this method only exists for the memory backend
 **/
function _activatePendingUser(token) {
    var user = _.findWhere( pendingUsers.pending_users, { token: token } );

    if(_.isUndefined( user )) {
        return result.NewErrorResult( ["users does not exist in pending queue"] );
    }

    var new_pending_users = _.reject(pendingUsers.pending_users, function (u) {
        return u.token === token;
    });

    pendingUsers.pending_users = new_pending_users;

    users.users.push(user);

    return 'ok'
}
exports.activatePendingUser = _activatePendingUser;


/**
 * specify that the call to create new user return
 * an error result. for debugging purposes.
 **/
var throwCreateUserError = false;

var createUserError = function (rawCreateUserForm, options) {
    options.error( result.NewErrorResult(
        ['auth manager user create fail']
    ) );
}

/**
 * put user form data into to pending activation queue
 **/
function _createNewUser( rawCreateUserForm, options ) {
    setTimeout(function () {

        if(throwCreateUserError) {
            createUserError( rawCreateUserForm, options );
            return;
        }

        var rawJsonNewUser = {
            username: rawCreateUserForm.username,
            password: rawCreateUserForm.password,
            email: rawCreateUserForm.email,
            token: 'tok'+_.uniqueId()
        };

        // TODO: if user exists (in both pending and users), return error

        pendingUsers.pending_users.push(rawJsonNewUser);

        options.success( result.NewSuccessResult( {
            username: rawJsonNewUser.username,
            email: rawJsonNewUser.email
        } ) );

    }, stub.timeout);
}
exports.createNewUser = _createNewUser;

/**
 * specify that the call to login a user returns
 * an error result. for debugging purposes.
 **/
var throwLoginUserError = false;

var loginUserError = function ( rawUserLoginForm, options ) {
    options.error( result.NewErrorResult(
        ['auth manager user login fail']
    ) );
}

/**
 * login a user
 **/
function _loginUser( rawUserLoginForm, options ) {
    setTimeout(function () {

        if(throwLoginUserError) {
            loginUserError( rawUserLoginForm, options );
            return;
        }

        var user = _.findWhere( users.users, {
            username: rawUserLoginForm.username,
            password: rawUserLoginForm.password
        } );

        if( _.isUndefined(user) ) {
            options.error( result.NewErrorResult(
                ['invalid username/password']
            ) );
            return;
        }

        options.success( result.NewSuccessResult( {
            username: user.username,
            email: user.email,
            token: user.token
        } ) );

    }, stub.timeout);
}
exports.loginUser = _loginUser;