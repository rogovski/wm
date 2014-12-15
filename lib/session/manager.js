var _ = require('underscore'),
    $ = require('jquery');


function _SessionManager () {
    this.sessions = [];

    this.load = function ( options ) {
        var self = this;

        if(_.isUndefined(options.backend)) {
            throw new Error("session manager: no backend provided");
        }

        options.backend.loadSessionManager({

            success: function ( response ) {
                self.session = response;
                $.publish( 'session.manager.load', { error: false, manager: this } );
            },

            error: function ( response ) {
                $.publish( 'session.manager.load', { error: true, manager: this } );
            }

        });
    };
}


var manager = null;


/**
 *
 * options :: {
 *    backend: Object
 *  }
 *
 **/
function _loadSessionManager( options ) {

    if( _.isNull(manager) ) {
        manager = new _SessionManager();
    }

    // TODO: we need multiple session state backends
    // a session state for the system might be some
    // in memory key value store or a server somewhere

    manager.load( options );
}
exports.loadSessionManager = _loadSessionManager;


function _createNewUser(userCreateForm) {
    console.log('TODO: create request');

    $.publish('client.userCreate.response');

}
exports.createNewUser = _createNewUser;