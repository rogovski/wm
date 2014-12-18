var result       = require('../../../types/sessionManagerBackendResult.js'),
    managerInfo  = require('../data/managerInfo.js'),
    session      = require('../data/session.js'),
    user         = require('../data/user.js'),
    _            = require('underscore');


/**
 * options :: { success :: Function, error: Function }
 **/
function _loadSessionManager( options ) {
    setTimeout(function () {
        options.success( result.NewSuccessResult( managerInfo.managerInfo ) );
    }, 1000);
}
exports.loadSessionManager = _loadSessionManager;

/**
 * given a user, return a list of sessions
 * options :: { success :: Function, error: Function }
 **/
function _loadUserSessions( rawJsonUser, options ) {

}
exports.loadUserSessions = _loadUserSessions;