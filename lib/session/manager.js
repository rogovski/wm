/**
 * NOTE: all backend objects return RAW json
 * all the modules in this ('session') folder
 * are responsible for constructing User/Session/Authentication
 * Backbone models out of the raw json data
 **/

var $              = require('jquery'),
    _              = require('underscore'),
    Backbone       = require('backbone'),
    authentication = require('./authentication.js');


/**
 * the return result of all clients who
 * call a session manager function
 **/
function _SessionManagerResult() {
    this.hasErrors = false;
    this.errors    = null;
    this.result    = null;
}

/**
 * create a new session manager result
 * that represents an error
 **/
function NewErrorResult( errors ) {
    var res = new _SessionManagerResult();

    res.hasErrors = true;
    res.errors = errors;

    return res;
}

/**
 * create a new session manager result
 * that represents a Success
 **/
function NewSuccessResult( result ) {
    var res = new _SessionManagerResult();

    res.result = result;

    return res;
}

/**
 * check if a result object is a _SessionManagerResult
 * should be used by callers
 **/
function _IsSessionManagerResult( result ) {
    if(result instanceof _SessionManagerResult)
        return true;

    return false;
}
exports.IsSessionManagerResult = _IsSessionManagerResult;


/**
 * backbone model that stores session information,
 * one instance per page load. this object is a proxy to
 * to some centralized data store. all users/sessions
 * could be accessed through it if a caller has the right credentials
 */
var _SessionManager = Backbone.Model.extend({


    defaults: {
        managerInfo: null
    },

    backend: null,


    /**
     * this fetch is primarily to retrieve config information
     * from the backend
     **/
    fetch: function (options) {

        if(this.backend == null)
            this.backend = options.backend;

        var self = this;

        this.backend.loadSessionManager({

            success: function ( response ) {
                // TODO: check to see if response has proper type
                // if( !self.backend.IsSessionManagerBackendResult(response) ) .. throw error ..

                self.set( { managerInfo: response.result } );

                options.success(NewSuccessResult( self ));
            },

            error: function ( response ) {
                // TODO: check to see if response has proper type
                // if( !self.backend.IsSessionManagerBackendResult(response) ) .. throw error ..

                options.error(NewErrorResult( response.errors ));
            }
        });
    }
});


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
        manager = new _SessionManager();
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


function _loadUserSessions( user ) {

}
exports.loadUserSessions = _loadUserSessions;