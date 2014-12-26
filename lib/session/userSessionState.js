/**
 * TODO: should probably rename this userSessionState.js
 **/

var $                    = require('jquery'),
    _                    = require('underscore'),
    Backbone             = require('backbone'),
    SessionModel         = require('../types/session.js'),
    UserModel            = require('../types/user.js'),
    UserSessionState     = require('../types/userSessionState.js'),
    SessionManagerResult = require('../types/sessionManagerResult.js'),
    ProcessManagerModel  = require('../types/processManager.js'),
    ProcessManager       = require('../process/processManager.js');


/**
 * options { backend, user, success, error }
 **/
UserSessionState.UserSessionState.prototype.fetch = function( options ) {

    var self = this;

    options.backend.loadUserSessions( options.user.toJSON(), {

        success: function ( response ) {
            // TODO: check to see if response has proper type
            // if( !self.backend.IsSessionManagerBackendResult(response) ) .. throw error ..

            var sessionCollection = self.get('sessions'),

                // refactor this into sessionCollection.js
                sessionModelList  = _.map( response.result, function (s) {
                    var smodel = new sessionCollection.model();

                    smodel.set({ sid: s.sid, display: s.display });

                    return smodel;
                } );

            sessionCollection.reset( sessionModelList );

            self.set('user', options.user);

            options.success( SessionManagerResult.NewSuccessResult( self ) );
        },

        error: function ( response ) {
            // TODO: check to see if response has proper type
            // if( !self.backend.IsSessionManagerBackendResult(response) ) .. throw error ..

            options.error( SessionManagerResult.NewErrorResult( response.errors ) );
        }

    } );
};


/**
 * given the active session index, lookup the model
 **/
UserSessionState.UserSessionState.prototype.activeSession = function() {

    if(this.get('activeSessionIdx') == null)
        throw new Error("active session is null");

    return this.get('sessions').models[this.get('activeSessionIdx')];
};


/**
 * load all existing sessions for a user using the given backend
 **/
function _loadUserSessions( user, backend ) {

    var sessionState = new UserSessionState.UserSessionState();

    sessionState.fetch({

        user: user,

        backend: backend,

        success: function ( response ) {
            $.publish( 'success.usersession.session.manager', response );
        },

        error: function ( response ) {
            $.publish( 'failed.usersession.session.manager', response );
        }

    })
}
exports.loadUserSessions = _loadUserSessions;


/**
 * lookup the list of processes in the active session
 **/
function _loadActiveSessionProcessManager( userSessionState, backend ) {

    var activeSession  = userSessionState.activeSession();
        user           = userSessionState.get('user'),
        processManager = activeSession.get('procManager');

    processManager.fetch({

        user: user,

        activeSession: activeSession,

        backend: backend,

        success: function ( response ) {

            activeSession.set( { procManager: response.result } );

            $.publish( 'success.activesession.session.manager',
                SessionManagerResult.NewSuccessResult( userSessionState ) );
        },

        error: function ( response ) {
            $.publish( 'failed.activesession.session.manager',
                SessionManagerResult.NewErrorResult( response.errors ) );
        }

    });
}
exports.loadActiveSessionProcessManager = _loadActiveSessionProcessManager;


function _renderActiveUserSession ( userSessionState, $rootEl ) {

    var activeSession  = userSessionState.activeSession();
        user           = userSessionState.get('user'),
        processManager = activeSession.get('procManager');

    processManager.setRootEl( $rootEl ).renderWindowedHandles();
}
exports.renderActiveUserSession = _renderActiveUserSession;




