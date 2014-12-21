/**
 * NOTE: all backend objects return RAW json
 * all the modules in this ('session') folder
 * are responsible for constructing User/Session/Authentication
 * Backbone models out of the raw json data
 **/

var $                    = require('jquery'),
    _                    = require('underscore'),
    Backbone             = require('backbone'),
    SessionManagerResult = require('../types/sessionManagerResult.js'),
    SessionManager       = require('../types/sessionManager.js'),
    authentication       = require('./authentication.js'),
    sessions             = require('./session.js');


/**
 * this fetch is primarily to retrieve config information
 * from the backend
 **/
SessionManager.SessionManager.prototype.fetch = function ( options ) {

    if(this.backend == null)
        this.backend = options.backend;

    var self = this;

    this.backend.loadSessionManager({

        success: function ( response ) {
            // TODO: check to see if response has proper type
            // if( !self.backend.IsSessionManagerBackendResult(response) ) .. throw error ..

            self.set( { managerInfo: response.result } );

            options.success( SessionManagerResult.NewSuccessResult( self ) );
        },

        error: function ( response ) {
            // TODO: check to see if response has proper type
            // if( !self.backend.IsSessionManagerBackendResult(response) ) .. throw error ..

            options.error( SessionManagerResult.NewErrorResult( response.errors ) );
        }
    });
};


/**
 * single instance of the session manager
 **/
var manager = null;


/**
 *
 * options :: {
 *    backend: Object
 *  }
 *
 **/
function _loadSessionManager( options ) {

    if(_.isUndefined(options.backend)) {
        throw new Error("session manager: no backend provided");
    }

    if( _.isNull(manager) ) {
        manager = new SessionManager.SessionManager();
    }

    // TODO: we need multiple session state backends
    // a session state for the system might be some
    // in memory key value store or a server somewhere

    manager.fetch( {

        backend: options.backend,

        success: function ( response ) {
            $.publish( 'loaded.session.manager', response );
        },

        error: function ( response ) {
            $.publish( 'failed.session.manager', response );
        }

    } );
}
exports.loadSessionManager = _loadSessionManager;

/**
 * offload the process of creating a new user to the
 * authentication manager. auth manager will in turn
 * make the request with a specific options.backend
 **/
function _createNewUser( userCreateForm ) {

    authentication.createNewUser( userCreateForm, manager.backend );
}
exports.createNewUser = _createNewUser;

/**
 * offload the process of logging in a user to the
 * authentication manager. auth manager will in turn
 * make the request with a specific options.backend
 **/
function _loginUser( userLoginForm ) {

    authentication.loginUser( userLoginForm, manager.backend );
}
exports.loginUser = _loginUser;

/**
 * given a user, return a new _UserSessionStateModel
 **/
function _loadUserSessions( user ) {

    sessions.loadUserSessions( user, manager.backend );
}
exports.loadUserSessions = _loadUserSessions;


function _loadActiveSessionProcessManager( userSessionState ) {

    sessions.loadActiveSessionProcessManager( userSessionState, manager.backend );
}
exports.loadActiveSessionProcessManager = _loadActiveSessionProcessManager;


function _renderActiveUserSession( userSessionState, $rootEl ) {

    sessions.renderActiveUserSession( userSessionState, $rootEl );
}
exports.renderActiveUserSession = _renderActiveUserSession;