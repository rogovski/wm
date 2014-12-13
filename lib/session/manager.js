var _ = require('underscore'),
    $ = require('jquery');


function _SessionManager () {
    this.sessions = [];

    this.load = function ( options ) {
        $.publish( 'session.manager.load', { manager: this } );
    };
}


var manager = null;


/**
 *
 * options :: {
 *
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

