var result       = require('../../../types/sessionManagerBackendResult.js'),
    managerInfo  = require('../data/managerInfo.js'),
    session      = require('../data/session.js'),
    user         = require('../data/user.js'),
    _            = require('underscore'),
    stub         = require('./stub.js');


/**
 * options :: { success :: Function, error: Function }
 **/
function _loadSessionManager( options ) {
    setTimeout(function () {
        options.success( result.NewSuccessResult( managerInfo.managerInfo ) );
    }, stub.timeout);
}
exports.loadSessionManager = _loadSessionManager;

/**
 * given a user, return a list of sessions
 * options :: { success :: Function, error: Function }
 **/
function _loadUserSessions( rawJsonUser, options ) {

    setTimeout(function () {
        var token = rawJsonUser.token;

        var userWithToken = _.findWhere(user.users, { token: token });

        if(_.isUndefined(userWithToken)) {
            options.error( result.NewErrorResult( rawJsonUser ) );
            return;
        }

        var userSessions = _.where( session.session, { uid: userWithToken.uid } );

        options.success( result.NewSuccessResult( userSessions ) );
    }, stub.timeout);

}
exports.loadUserSessions = _loadUserSessions;


function _createNewUserSession (argument) {
    // TODO: insert taskmanager process here. given
    // any process, task manager is always running
}