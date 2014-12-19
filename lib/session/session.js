var $                    = require('jquery'),
    _                    = require('underscore'),
    Backbone             = require('backbone'),
    sessionModel         = require('../types/session.js'),
    userModel            = require('../types/user.js'),
    userSessionState     = require('../types/userSessionState.js'),
    SessionManagerResult = require('../types/sessionManagerResult.js');

/**
 * options { backend, user, success, error }
 **/
userSessionState.UserSessionState.prototype.fetch = function( options ) {

    var self = this;

    options.backend.loadUserSessions( options.user.toJSON(), {

        success: function ( response ) {
            // TODO: check to see if response has proper type
            // if( !self.backend.IsSessionManagerBackendResult(response) ) .. throw error ..

            var sessionCollection = self.get('sessions'),
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
}


function _loadUserSessions( user, backend ) {

    var sessionState = new userSessionState.UserSessionState();

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







